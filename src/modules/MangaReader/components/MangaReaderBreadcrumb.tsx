import Breadcrumb from "../../../components/Breadcrumb";

type MangaReaderBreadcrumbProps = {
	mangaName: string;
	currentChapter: string;
	currentPage: number;
};

const MangaReaderBreadcrumb: React.FC<MangaReaderBreadcrumbProps> = ({
	mangaName,
	currentChapter,
	currentPage,
}) => {
	return (
		<Breadcrumb
			items={[
				{
					text: mangaName,
					href: "#",
				},
				{
					text: currentChapter,
					href: "#",
				},
				{
					text: `Page ${currentPage}`,
					href: "#",
				},
			]}
		/>
	);
};

export default MangaReaderBreadcrumb;
