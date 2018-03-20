class GameElement extends egret.Sprite{
	public id: number;
	public type: string = "";
	public locationX: number;
	public locationY: number;
	public x: number;
	public y: number;
	constructor(id, type){
		super();
		this.id = id;
		this.type = type;
		this.locationX = id % GameData.maxRow ;
		this.locationY = Math.floor(id / GameData.maxRow) ;
	}
	public update(id: number){
		this.id = id;
		this.locationX = id % GameData.maxRow ;
		this.locationY = Math.floor(id / GameData.maxRow) ;
	}
}