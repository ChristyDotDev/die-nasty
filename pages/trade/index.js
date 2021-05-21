import { Container, Heading, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Stack, HStack, VStack, Box } from "@chakra-ui/react"
import { useRouter } from "next/router";
const league_api = `${process.env.league_api}`

export async function getServerSideProps(context) {
  const trades_res = await fetch(`${league_api}/league/trades`)
  const trades_data = await trades_res.json();
  
  return { props: { trades:trades_data } };
}

export default function Trades({ trades }) {
  const router = useRouter();

  const handleTradeClick = (id) => {
    router.push(`/trade/${id}`);
  };

  return (
    <Container maxW="container.xl">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Txn ID</Th>
              <Th>Trade</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trades.map((trade) => (
              <Tr key={trade.transaction_id} data-id={trade.transaction_id} >
                <Td fontWeight="bold">{new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                  }).format(new Date(trade.timestamp))}
                </Td>
                <Td onClick={() => handleTradeClick(trade.transaction_id)}>{trade.transaction_id}</Td>
                <Td>
                <HStack spacing="20px" verticalAlign='top'>
                  {trade.trade_parts.map((tp) => (
                    <Box w="240px">
                      <Text fontWeight="extrabold" verticalAlign='top'>{tp.newRoster}</Text>
                        {tp.adds.map((add) => (
                          <Text verticalAlign='top'>{add}</Text>
                        ))}
                    </Box>
                  ))}
                </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
    </Container>
  );
}
