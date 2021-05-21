import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image, Text, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`
const league_api = `${process.env.league_api}`

export async function getServerSideProps(context) {
  const rosters_res = await fetch(`${league_api}/league/rosters`)
  const rosters_data = await rosters_res.json();
  const users_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/users`)
  const users_data = await users_res.json();
  
  return { props: { rosters: rosters_data, users: users_data } };
}

export default function Rosters({ rosters, users, players }) {
  const router = useRouter();
  
  return (
    <Container maxW="container.xl">
      <Tabs isFitted colorScheme="teal">
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
                    <Tr key={player.player_id} data-id={player.player_id}>
                      <Td fontWeight="bold">
                        <Stack direction="row">
                          <Image src={player.avatar_url} fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/0/0e/Lakeyboy_Silhouette.PNG" borderRadius="full" boxSize="25px" objectFit="cover"/>
                          <Text>{player.full_name}</Text>
                        </Stack>
                      </Td>
                      <Td fontWeight="bold">{player.position}</Td>
                      <Td fontWeight="bold">{player.team}</Td>
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
