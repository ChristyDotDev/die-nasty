import { Container, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const trade_id = context.params.id
  
  return { props: { trade: trade_id } };
}

export default function Trade({ trade }) {
  const router = useRouter();

  return (
    <Container maxW="container.xl">
      <Text>Bad deal for all involved. Can't believe you clowns keep doing this</Text>
    </Container>
  );
}
