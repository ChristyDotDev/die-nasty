import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`

export async function getServerSideProps(context) {
  const users_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/users`)
  const users_data = await users_res.json();

  const players_res = await fetch(`https://api.sleeper.app/v1/players/nfl`)
  const players_data = await players_res.json();

  const txns_res = await fetch(`https://api.sleeper.app/v1/league/${league_id}/transactions/1`)
  const txns_data = await txns_res.json();
  const trades = txns_data.filter(t => t.type == 'trade' & t.status == 'complete')

  let traded_players = {}
  trades.forEach(t => {
    Object.keys(t.adds).forEach(add => {
      traded_players[players_data[add].player_id] = players_data[add];
    });
  });
  
  return { props: { users: users_data, trades:trades, players: traded_players } };
}

export default function Trades({ users, trades, players }) {
  const router = useRouter();
  

  return (
    <Container maxW="container.xl">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Txn ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => (
              <Tr key={trade.transaction_id} data-id={trade.transaction_id}>
                <Td fontWeight="bold">{new Date(trade.status_updated).toLocaleDateString()}</Td>
                <Td>{trade.transaction_id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    </Container>
  );
}
