import { ChakraProvider } from "@chakra-ui/react";
import Header from "@components/Header";

function Application({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default Application;
