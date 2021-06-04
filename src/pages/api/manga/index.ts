import type { NextApiRequest, NextApiResponse } from "next";

import { elapsedTime } from "../../../utils/date";
import { getDirectories, getDirectoriesContent } from "../../../utils/file";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const prevPath =
		process.env.NODE_ENV === "development" ? "/public/manga" : "/manga";

	const mangaDirectories = prevPath;

	const time = elapsedTime();

	time.before();

	const mangaListNames = getDirectories(mangaDirectories);

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
