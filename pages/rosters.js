import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image, Text, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`

export async function getServerSideProps(context) {
  const rosters_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/rosters`)
  const rosters_data = await rosters_res.json();
  const rostered_players = rosters_data.flatMap(r => r.players);;

  const users_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/users`)
  const users_data = await users_res.json();

  const players_res = await fetch(`https://api.sleeper.app/v1/players/nfl`)
  const players_data = await players_res.json();
  const rostered_players_data = Object.values(players_data)
            .filter(p => rostered_players.includes(p.player_id));

  let player_map = {};
  for(var i = 0; i < rostered_players_data.length; i++) {
    rostered_players_data[i].avatar_url = `https://sleepercdn.com/content/nfl/players/${rostered_players_data[i].player_id}.jpg`
    player_map[rostered_players_data[i].player_id] = rostered_players_data[i];
  }
  
  return { props: { rosters: rosters_data, users: users_data, players: player_map } };
}

export default function Rosters({ rosters, users, players }) {
  const router = useRouter();
  

  return (
    <Container maxW="container.xl">
      <Tabs isFitted colorScheme="gray">
        <TabList>
          {users.map((user) => (
            <Tab>{user.display_name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {users.map((user) => (
            <TabPanel>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Player</Th>
                    <Th>Position</Th>
                    <Th>Team</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rosters.find(({ owner_id}) => owner_id === user.user_id ).players.map((player) => (
                    <Tr key={player} data-id={player}>
                      <Td fontWeight="bold">
                        <Stack direction="row">
                          <Image src={players[player].avatar_url} borderRadius="full" boxSize="25px" objectFit="cover"/>
                          <Text>{players[player].full_name}</Text>
                        </Stack>
                      </Td>
                      <Td fontWeight="bold">{players[player].position}</Td>
                      <Td fontWeight="bold">{players[player].team}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
