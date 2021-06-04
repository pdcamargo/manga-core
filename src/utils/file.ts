import path from "path";
import { readdirSync, existsSync, readFileSync } from "fs";
import getConfig from "next/config";

export const getDirectories = (source: string, onlyDir = true): string[] => {
	if (!existsSync(source)) {
		return [];
	}

	return readdirSync(source, { withFileTypes: true })
		.filter((dirent) => (onlyDir ? dirent.isDirectory() : true))
		.map((dirent) => dirent.name);
};

const getJsonFileContent = (basePath: string) => {
	if (!existsSync(basePath)) {
		return undefined;
	}
	return JSON.parse(readFileSync(basePath).toString());
};

export const getDirectoriesContent = (source: string, mangaNames: string[]) => {
	return mangaNames.map((name) => {
		const mangaFolderPath = `${source}/${name}/volumes`;
		const info = getJsonFileContent(`${source}/${name}/info.json`);

		const mangaVolumes = getDirectories(mangaFolderPath).map((volumeName) => {
			const volumeInfo = getJsonFileContent(
				`${mangaFolderPath}/${volumeName}/info.json`
			);

			const mangaChapters = getDirectories(`${mangaFolderPath}/${volumeName}`);

			const chapters = mangaChapters.map((chapter) => {
				const content = getDirectories(
					`${mangaFolderPath}/${volumeName}/${chapter}`,
					false
				)
					.filter((chapterName) => chapterName !== "info.json")
					.map(
						(chapterName) =>
							`${mangaFolderPath}/${volumeName}/${chapter}/${chapterName}`.split(
								"/public"
							)[1]
					);
				const chapterInfo = getJsonFileContent(
					`${mangaFolderPath}/${volumeName}/${chapter}/info.json`
				);

				return {
					info: chapterInfo,
					chapter,
					content,
				};
			});

			return {
				info: volumeInfo,
				name: volumeName,
				chapters,
			};
		});

		return {
			name,
			info,
			volumes: mangaVolumes,
		};
	});
};

export const serverPath = (staticFilePath: string) => {
	return path.join(
		getConfig().serverRuntimeConfig.PROJECT_ROOT,
		staticFilePath
	);
};
