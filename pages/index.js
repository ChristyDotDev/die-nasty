import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`

export async function getServerSideProps(context) {  
  return { props: { } };
}

export default function Home({ }) {
  const router = useRouter();
  

  return (
    <Container maxW="container.xl">
      <Tabs isFitted colorScheme="teal">
        <TabList>
          Home Page
        </TabList>
      </Tabs>
    </Container>
  );
}
