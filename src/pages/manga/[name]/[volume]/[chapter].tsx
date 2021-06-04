import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import MangaReader from "../../../../modules/MangaReader";

import { IManga } from "../../../../types/manga";

const Home: React.FC<{ data: IManga[] }> = ({ data }) => {
	const { query, replace, prefetch, push } = useRouter();

	const manga = data.find((manga) => manga.name === `${query.name}`);
	const pathname = `/manga/${manga?.name}/${query.volume}/${query.chapter}`;

	const handlePageChange = (newPage: number, maxPage: number) => {
		const perPage = query.perPage || 1;
		replace(
			{
				pathname,
				query: {
					page: newPage,
					perPage,
				},
			},
			undefined,
			{
				shallow: true,
			}
		);

		if (newPage < maxPage) {
			prefetch(pathname + `?page=${newPage + 1}&perPage=${perPage}`);
		}

		if (newPage > 1) {
			prefetch(pathname + `?page=${newPage - 1}&perPage=${perPage}`);
		}
	};

	const handlePerPageChange = (newPerPage: number) => {
		replace(
			{
				pathname,
				query: {
					page: query.page || 1,
					perPage: newPerPage,
				},
			},
			undefined,
			{
				shallow: true,
			}
		);
	};

	const handleChapterChange = (newChapter: string) => {
		const perPage = query.perPage || 1;
		const newPathname = `/manga/${manga?.name}/${query.volume}/${newChapter}`;

		push(
			{
				pathname: newPathname,
				query: {
					perPage,
					page: 1,
				},
			},
			undefined,
			{
				shallow: true,
			}
		);

		prefetch(newPathname + `?page=2&perPage=${perPage}`);
	};

	return (
		<MangaReader
			manga={manga as IManga}
			currentVolume={+`${query.volume}`}
			currentPage={+`${query.page}`}
			currentChapter={`${query.chapter}`}
			perPage={+`${query.perPage || 1}`}
			onChangePage={handlePageChange}
			onChangePerPage={handlePerPageChange}
			onChangeChapter={handleChapterChange}
		/>
	);
};

export default Home;

export const getStaticPaths: GetStaticPaths = async (context) => {
	const port = process.env.PORT || 3000;

	const url = process.env.NODE_ENV === `http://localhost:${port}`;

	const {
		data: { data },
	} = await axios(`${url}/api/manga`);

	const mangas: IManga[] = data.filter(
		(manga: IManga) => manga.volumes.length > 0
	);

	const paths: any[] = [];

	mangas.forEach((manga) => {
		manga.volumes.forEach((volume, volumeIdx) => {
			volume.chapters.forEach(({ chapter }) => {
				paths.push({
					params: {
						name: manga.name,
						volume: `${volumeIdx + 1}`,
						chapter,
					},
				});
			});
		});
	});

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
	const port = process.env.PORT || 3000;

	const url = process.env.NODE_ENV === `http://localhost:${port}`;

	const {
		data: { data },
	} = await axios(`${url}/api/manga`);

	return {
		props: {
			data,
		},
	};
};
