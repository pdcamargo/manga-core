import type { NextApiRequest, NextApiResponse } from "next";

import { join } from "path";

import { elapsedTime } from "../../../utils/date";
import {
	getDirectories,
	getDirectoriesContent,
	serverPath,
} from "../../../utils/file";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const mangaDirectories =
		process.env.NODE_ENV === "development"
			? serverPath("public/manga")
			: serverPath("manga");

	const time = elapsedTime();

	time.before();

	const mangaListNames = getDirectories(mangaDirectories);
	console.log(mangaDirectories, mangaListNames);

	const mangaList = getDirectoriesContent(mangaDirectories, mangaListNames);

	time.after();

	res.status(200).send(
		JSON.stringify(
			{
				data: mangaList,
				seconds: time.secondsPassed,
			},
			null,
			2
		)
	);
};
