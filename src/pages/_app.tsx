import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "'Maven Pro', sans-serif",
        color: mode("gray.800", "white")(props),
        bg: mode("white", "#000913")(props),
        lineHeight: "normal",
        fontWeight: 500,
        letterSpacing: "0.5px",
      },
    }),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
