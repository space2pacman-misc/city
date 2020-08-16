class Layout extends EventEmitter {
	constructor(type, field, w, h) {
		super();
		this._type = type;
		this._field = field;
		this._layout = [];
		this._w = w;
		this._h = h;
		this._init();
	}

	create() {
		for(let i = 0; i < this._h; i++) {
			this._layout[i] = [];
			
			for(let j = 0; j < this._w; j++) {
				this._layout[i][j] = "00";
			}
		}

		this._render();

		return this._layout;
	}

	clear(element) {
		let elements = element.children;

		for(let i = 0; i < elements.length; i++) {
			elements[i].className = "";
			elements[i].classList.add("cell");
			elements[i].classList.add("empty");
		}
	}

	update() {
		let type = this._field.querySelector(`.${this._type}`);

		this.clear(type);
		this._render();
	}

	_render(w, h) {
		let layout = document.createElement("div");

		for(let i = 0; i < this._h; i++) {			
			for(let j = 0; j < this._w; j++) {
				let element = document.createElement("div");
				let type = this._layout[i][j].slice(0, 2);
				let state = this._layout[i][j].slice(2);

				switch(type) {
					case "00":
						element.classList.add("empty");

						break;
					case "01":
						element.className = "";
						element.classList.add("traffic-light");

						switch(state) {
							case "stop":
								element.classList.add("traffic-light--stop");

								break;
							case "ready":
								element.classList.add("traffic-light--ready");

								break;
							case "go":
								element.classList.add("traffic-light--go");

								break;
						}

						break;
				}

				element.classList.add("cell");
				layout.classList.add(this._type);
				layout.append(element);
			}
		}

		let type = this._field.querySelector(`.${this._type}`);
		
		if(!type) {
			this._field.append(layout);
		} else {
			for(let i = 0; i < layout.children.length; i++) {
				type.replaceChild(layout.children[i].cloneNode(), type.children[i])
			}
		}
	}

	_init() {
		this.on(`on${this._type}Update`, this.update.bind(this));
	}
}