class BackBtn extends BaseBtn{
	
	public do(sceen: string){
		switch (sceen){
			case "Home":
				SceenControl.loadHome();
				break;
			case "Chapter":
				SceenControl.loadChapter();
				break;
			case "Game":
				SceenControl.loadGame(LocalStorageControl.getChapter());
				break;

		}
	}
}