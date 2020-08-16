class TrafficLight extends EventEmitter {
	constructor(layout) {
		super();
		this._layout = layout;
		this._line = ["stop", "ready", "go", "ready"];
		this._index = 0;
	}

	add(x, y) {
		this._layout[x][y] = "01";
		this.emit("onTrafficLightUpdate");
	}

	enable(x, y) {
		this._layout[x][y] = "01stop";
		this.emit("onTrafficLightUpdate");

		setInterval(() => {
			this.switch(x, y);
		}, 2000)
	}

	switch(x, y) {
		let state = this._line[this._index];

		this._layout[x][y] = `01${state}`;
		this._index++;

		if(this._index === this._line.length) {
			this._index = 0;
		}

		this.emit("onTrafficLightUpdate");
	}
}