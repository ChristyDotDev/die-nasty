import { Container, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image, Text, Stack, Box, Avatar,  Flex } from "@chakra-ui/react"
import { useRouter } from "next/router";
const league_api = `${process.env.league_api}`

export async function getServerSideProps(context) { 
  const schedule_res = await fetch(`${league_api}/league/schedule`)
  const schedule_data = await schedule_res.json();
  // TODO - pull in schedule
  console.log(schedule_data);

  return { props: { schedule: schedule_data } };
}

export default function Home({ schedule }) {
  const router = useRouter();
  
  return (
    <Container maxW="container.xl">
      {Object.keys(schedule).map((schedule_id) => (
        <Flex w='100%'>
          {schedule[schedule_id].map((team) => (
            <Box>
              <Image src={team.avatar} borderRadius="full" boxSize="25px" objectFit="cover"/>
              {team.team}
            </Box>
          ))}
        </Flex>
      ))}
    </Container>
  );
}
