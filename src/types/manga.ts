export type IMangaChapter = {
	content: string[];
	info: {
		name: string;
	};
	chapter: string;
};

export type IMangaVolume = {
	name: string;
	info: {
		releaseDate: string;
	};
	chapters: IMangaChapter[];
};
export type IManga = {
	name: string;
	info: {
		name: string;
		author: string;
		genres: string[];
		tags: string[];
	};
	volumes: IMangaVolume[];
};
