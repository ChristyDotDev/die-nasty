import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`

export async function getServerSideProps(context) {
  const rosters_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/rosters`)
  const rosters_data = await rosters_res.json();

  const users_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/users`)
  const users_data = await users_res.json();

  console.log(rosters_data)
  console.log(users_data)
  return { props: { rosters: rosters_data, users: users_data } };
}

export default function Home({ rosters, users }) {
  const router = useRouter();

  return (
    <Container maxW="750px" mt="20px">
      <Tabs mb="20px" isFitted colorScheme="orange">
        <TabList>
          {users.map((user) => (
            <Tab>{user.display_name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {users.map((user) => (
            <TabPanel>
              <Heading as="h2" size="lg">
                {user.user_id} - {user.display_name} - {rosters.find(({ owner_id}) => owner_id === user.user_id ).roster_id}
              </Heading>

              <Table mb="40px">
                <Thead>
                  <Tr>
                    <Th>Player</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rosters.find(({ owner_id}) => owner_id === user.user_id ).players.map((player) => (
                    <Tr>
                      <Td fontWeight="bold">{player}</Td>
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
