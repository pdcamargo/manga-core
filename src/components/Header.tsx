import { Button, Container, Flex } from "@chakra-ui/react";
import React from "react";
import useScrollDirection from "../hooks/useScrollDirection";

export const HeaderButtonLink: React.FC<{
	text: string;
}> = ({ text }) => {
	return (
		<HeaderLink>
			<Button
				fontSize="11px"
				textTransform="uppercase"
				fontWeight="extrabold"
				bgColor="blue.400"
				color="white"
				borderRadius="sm"
				_hover={{
					bgColor: "blue.500",
				}}
			>
				{text}
			</Button>
		</HeaderLink>
	);
};

export const HeaderLink: React.FC<{
	text?: string;
}> = ({ text, children }) => {
	return (
		<Flex
			paddingX="4"
			borderBottom="solid 2px"
			borderColor="transparent"
			height="100%"
			alignItems="center"
			textTransform="uppercase"
			cursor="pointer"
			transition="color 1s cubic-bezier(0.06, 0.81, 0, 0.98), border-color 0.5s cubic-bezier(0.06, 0.81, 0, 0.98)"
			letterSpacing="1px"
			paddingTop="2px"
			fontSize="11px"
			color="white"
			_hover={{
				borderColor: text ? "blue.400" : "transparent",
			}}
		>
			{text || children}
		</Flex>
	);
};

const Header: React.FC<{
	leftSlot?: React.ReactNode;
	centerSlot?: React.ReactNode;
	rightSlot?: React.ReactNode;
}> = ({ leftSlot, centerSlot, rightSlot }) => {
	const dir = useScrollDirection({
		initialDirection: "up",
		off: false,
		thresholdPixels: 0,
	});

	console.log(dir);

	return (
		<Flex
			height={["65px", null, null, "80px"]}
			bgColor="#111111"
			borderBottom="2px solid rgba(51, 51, 51, 0.25)"
			fontWeight="extrabold"
			width="100%"
			position="fixed"
			top="0"
			left="0"
			zIndex="1"
			transition="all ease .3s"
			transform={`translateY(${dir === "up" ? "0" : "-100"}%)`}
		>
			<Container maxW="container.xl" height="100%">
				<Flex alignItems="center" justifyContent="space-between" height="100%">
					<Flex alignItems="center" height="100%">
						{leftSlot}
					</Flex>
					<Flex alignItems="center" height="100%">
						{centerSlot}
					</Flex>
					<Flex alignItems="center" height="100%">
						{rightSlot}
					</Flex>
				</Flex>
			</Container>
		</Flex>
	);
};

export default Header;
