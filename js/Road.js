class Road extends EventEmitter {
	constructor(layout) {
		super();
		this._layout = layout;
	}

	add(x, y) {
		this._layout[x][y] = "02";
		this.emit("onRoadUpdate");
	}

	getLayout() {
		return this._layout;
	}
}