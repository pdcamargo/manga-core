import type { NextApiRequest, NextApiResponse } from "next";

import { join } from "path";
import { elapsedTime } from "../../../utils/date";
import { getDirectories, getDirectoriesContent } from "../../../utils/file";

const mangaDirectories = join(__dirname, "../../../../public/manga");

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
