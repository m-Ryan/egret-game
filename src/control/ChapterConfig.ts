class ChapterConfig {
	public static getData(chapter: number){
		let json = RES.getRes("chapterMap_json");
		return json[chapter];
	}
	public static getChapterNum(){
		let json = RES.getRes("chapterMap_json");
		return Object.keys(json).length;
	}
}