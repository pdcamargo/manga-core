import {
	Box,
	Button,
	ButtonGroup,
	HStack,
	Image,
	Select,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	Tag,
	TagLabel,
	Text,
	useTheme,
} from "@chakra-ui/react";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { MdArrowDropDown } from "react-icons/md";

import Breadcrumb from "../../components/Breadcrumb";
import MangaReaderLayout from "../../layouts/MangaReaderLayout";
import { createArrayGroups } from "../../utils/array";
import { IManga, IMangaChapter } from "../../types/manga";
import MangaReaderBreadcrumb from "./components/MangaReaderBreadcrumb";

type MangaReaderProps = {
	manga: IManga;
	currentVolume: number;
	currentPage: number;
	currentChapter: string;
	perPage: number;
	onChangePage: (newPage: number, maxPage: number) => void;
	onChangePerPage: (newPerPage: number) => void;
	onChangeChapter: (newChapter: string) => void;
};

const MangaReader: React.FC<MangaReaderProps> = ({
	manga,
	currentVolume,
	currentPage,
	currentChapter,
	perPage,
	onChangePage,
	onChangePerPage,
	onChangeChapter,
}) => {
	const [zoomValue, setZoomValue] = useState(100);
	const [maxPage, setMaxPage] = useState(1);

	const containerRef = useRef<HTMLDivElement>(null);
	const {
		sizes: { container },
	} = useTheme();

	const volume = useMemo(() => {
		return manga.volumes[currentVolume - 1];
	}, [manga, currentVolume]);

	const chapters = useMemo(() => {
		return volume.chapters.find(
			(chapter) => chapter.chapter === currentChapter
		) as IMangaChapter;
	}, [volume, currentChapter]);

	const groups = useMemo(() => {
		const volumes = manga?.volumes[currentVolume - 1];

		const chapters = volumes.chapters.find(
			(c) => c.chapter === currentChapter
		)?.content;

		return createArrayGroups(chapters as string[], perPage);
	}, [perPage, currentChapter, manga]);

	const getImageWidth = () => {
		const defaultSize = +container.xl.replace("px", "");

		return (
			((containerRef.current?.offsetWidth || defaultSize) * zoomValue) / 100
		);
	};

	const handleNextAndPrevClick = useCallback(
		(isNext = true) => {
			if (
				(isNext && currentPage === maxPage) ||
				(!isNext && currentPage === 1)
			) {
				return currentPage;
			}

			const newPage = currentPage + (isNext ? 1 : -1);

			onChangePage(newPage, maxPage);
		},
		[maxPage, onChangePage, currentPage]
	);

	useEffect(() => {
		setMaxPage(groups.length);
	}, [perPage, groups]);

	return (
		<MangaReaderLayout>
			<Stack spacing={7} my={7}>
				<MangaReaderBreadcrumb
					mangaName={manga.name}
					currentPage={currentPage + 1}
					currentChapter={`${currentVolume}`}
				/>

				<Stack direction="row" spacing={3} alignItems="center">
					<Select
						variant="filled"
						icon={<MdArrowDropDown />}
						placeholder="Per Page"
						_focus={{
							borderColor: "transparent",
						}}
						onChange={(e) => onChangePerPage(+e.target.value)}
						value={perPage}
					>
						{Array(chapters.content.length)
							.fill("")
							.map((_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
					</Select>
					<Select
						variant="filled"
						icon={<MdArrowDropDown />}
						placeholder="Capítulo"
						_focus={{
							borderColor: "transparent",
						}}
						value={chapters.chapter}
						onChange={(e) => onChangeChapter(e.target.value)}
					>
						{volume.chapters.map((chapter) => (
							<option key={chapter.info.name} value={chapter.chapter}>
								{chapter.info.name}
							</option>
						))}
					</Select>
					<Select
						variant="filled"
						icon={<MdArrowDropDown />}
						placeholder="Load: All Images"
						_focus={{
							borderColor: "transparent",
						}}
					/>
					<Slider
						value={zoomValue}
						min={50}
						max={100}
						step={1}
						onChange={setZoomValue}
					>
						<SliderTrack>
							<Box position="relative" right={10} />
							<SliderFilledTrack />
						</SliderTrack>
						<SliderThumb boxSize={6} />
					</Slider>
					<ButtonGroup isAttached variant="solid">
						<Button
							mr="-px"
							onClick={() => handleNextAndPrevClick(false)}
							disabled={currentPage === 1}
						>
							Prev
						</Button>
						<Button
							mr="-px"
							onClick={() => handleNextAndPrevClick(true)}
							disabled={currentPage === maxPage}
						>
							Next
						</Button>
					</ButtonGroup>
				</Stack>

				<Box
					ref={containerRef}
					d="flex"
					alignItems="flex-start"
					justifyContent="center"
				>
					<Stack direction="column" spacing={4}>
						{groups[currentPage - 1]?.map((item) => (
							<React.Fragment key={item}>
								<Text fontSize="small" fontWeight="bold" textAlign="center">
									{chapters.content.findIndex((ch) => ch === item) + 1}/
									{chapters.content.length}
								</Text>
								<Image
									width={`${getImageWidth()}px`}
									src={item}
									alt="Cap X cover"
									boxShadow="dark-lg"
								/>
							</React.Fragment>
						))}
					</Stack>
				</Box>

				<Breadcrumb
					items={[
						{
							text: "Home",
							href: "#",
						},
						{
							text: "Gêneros",
							href: "#",
						},
						{
							text: `${manga.info.genres.join(", ")}`,
							href: "#",
						},
					]}
				/>

				<Box>
					<span>Tags</span>
					<HStack spacing={4} mt={3}>
						{manga.info.tags.map((tag) => (
							<Tag key={tag} variant="subtle" colorScheme="blue">
								<TagLabel>{tag}</TagLabel>
							</Tag>
						))}
					</HStack>
				</Box>
			</Stack>
		</MangaReaderLayout>
	);
};

export default MangaReader;
