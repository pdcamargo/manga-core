import { Box, Container } from "@chakra-ui/layout";
import { Switch, useColorMode } from "@chakra-ui/react";

import Header, { HeaderButtonLink, HeaderLink } from "../components/Header";
import Logo from "../components/Logo";

const MangaReaderLayout: React.FC = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box paddingTop={["65px", null, null, "80px"]}>
      <Container maxW="container.xl">
        <Header
          leftSlot={
            <>
              <Logo />
              <HeaderLink text="Notas de atualização" />
            </>
          }
          rightSlot={
            <>
              <Switch
                size="md"
                checked={colorMode === "light"}
                onChange={toggleColorMode}
              />
              <HeaderButtonLink text="Iniciar sessão" />
            </>
          }
        />

        <Box width="100%">{children}</Box>
      </Container>
    </Box>
  );
};

export default MangaReaderLayout;
