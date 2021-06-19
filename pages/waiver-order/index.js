import { Container, Heading } from "@chakra-ui/layout";
import { ListItem, OrderedList } from "@chakra-ui/react"

const league_api = `${process.env.league_api}`

export async function getServerSideProps(context) {
  const waivers_res = await fetch(`${league_api}/league/waiver`)
  const waivers_data = await waivers_res.json();
  return { props: { waivers: waivers_data } };
}

export default function WaiverOrder({ waivers }) {
  return (
    <Container maxW="container.xl">
      <Heading as='h2'>Waiver Order</Heading>
      <OrderedList>
        {Object.keys(waivers).map((waiver) => (
            <ListItem key={waiver}>{waivers[waiver]}</ListItem>
        ))}
      </OrderedList>
    </Container>
  );
}
