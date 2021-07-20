import { Container, Heading } from "@chakra-ui/layout";
import { List, ListItem, Link } from "@chakra-ui/react"
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  return { props: { } };
}

export default function Rosters({ }) {
  const router = useRouter();
  
  return (
    <Container maxW="container.xl">
      <Heading as="h2" size="md" m={1}>Calculators</Heading>
      <List>
        <ListItem>
          <Link href="https://keeptradecut.com" isExternal>
            KeepTradeCut
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://apps.dynastyprocess.com/calculator/" isExternal>
          Dynastyprocess
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://dynasty101.com/trade-calculator/" isExternal>
            Dynasty101
          </Link>
        </ListItem>
      </List>

      <Heading as="h2" size="md" m={1}>Christy's Homemade Tools</Heading>
      <List>
        <ListItem>
          <Link onClick={() => router.push(`/tools/rosterAnalyser`)}>
            Roster Analyser
          </Link>
        </ListItem>
      <ListItem>
          <Link onClick={() => router.push(`/tools/leagueSimulator`)}>
              League Simulator
          </Link>
      </ListItem>
      </List>

      <Heading as="h2" size="md" m={1}>League Info</Heading>
      <List>
        <ListItem>
          <Link onClick={() => router.push(`/waiver-order`)}>
            Waiver Order
          </Link>
        </ListItem>
      </List>
    </Container>
  );
}
