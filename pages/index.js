import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
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
    player_map[rostered_players_data[i].player_id] = rostered_players_data[i];
  }
  
  return { props: { rosters: rosters_data, users: users_data, players: player_map } };
}

export default function Home({ rosters, users, players }) {
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
                    <Tr key={player}>
                      <Td fontWeight="bold">{players[player].full_name}</Td>
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
