import { Container, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const trade_id = context.params.id
  
  return { props: { trade: trade_id } };
}

export default function Trade({ trade }) {
  const router = useRouter();

  return (
    <Container maxW="container.xl">
        <Text>{trade}</Text>
    </Container>
  );
}
