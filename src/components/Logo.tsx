import { Flex } from "@chakra-ui/layout";
import { FaSkull } from "react-icons/fa";

const Logo: React.FC<{
  size?: "sm" | "md" | "lg";
}> = ({ size = "md" }) => {
  const sizes: Record<typeof size, string> = {
    sm: "30px",
    md: "40px",
    lg: "50px",
  };

  return (
    <Flex
      w={sizes[size]}
      h={sizes[size]}
      borderRadius="50%"
      bgColor="white"
      alignItems="center"
      justifyContent="center"
      color="#111"
      fontSize="2xl"
      mr="5"
    >
      <FaSkull />
    </Flex>
  );
};

export default Logo;
