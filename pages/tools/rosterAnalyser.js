import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image, Text, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router";
const league_id = `${process.env.league_id}`

export default function Analyse({  }) {
  
  return (
    <iframe src="https://christyc92.shinyapps.io/dienasty-rosters/" width="100%" height="1600px"></iframe>
  );
}
