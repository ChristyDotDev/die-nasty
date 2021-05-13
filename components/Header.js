import { Heading } from "@chakra-ui/layout";
import { Flex, Spacer } from "@chakra-ui/react"
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <Flex p={3}>
      <Heading as="h1" size="lg" m={1} cursor="pointer" onClick={() => router.push("/")}>Die Nasty</Heading>
      <Spacer />
      <Heading as="h3" size="md" m={1} cursor="pointer" onClick={() => router.push("/rosters")}>Rosters</Heading>
      <Heading as="h3" size="md" m={1} cursor="pointer" onClick={() => router.push("/trades")}>Trades</Heading>
  </Flex>
  );
}
