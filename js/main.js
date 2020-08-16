Layout.field = document.querySelector(".field");

let trafficLightLayout = new Layout("TrafficLight", 10, 10);
let trafficLight = new TrafficLight(trafficLightLayout.create());
let roadLayout = new Layout("Road", 10, 10);
let road = new Road(roadLayout.create());

trafficLight.add(2, 2);
trafficLight.enable(2, 2);

road.add(8,1);
road.add(7,1);
road.add(6,1);
road.add(5,1);
road.add(4,1);
road.add(3,1);
road.add(2,1);
road.add(1,1);
road.add(1,2);
road.add(1,3);
road.add(1,4);
road.add(1,5);
road.add(1,6);
road.add(1,7);
road.add(1,8);
road.add(2,8);
road.add(3,8);
road.add(4,8);
road.add(5,8);
road.add(6,8);
road.add(7,8);
road.add(8,8);
road.add(8,7);
road.add(8,6);
road.add(8,5);
road.add(8,4);
road.add(8,3);
road.add(8,2);

class Car extends EventEmitter {
	constructor(layout, roadLayout, trafficLightLayout) {
		super();
		this._layout = layout;
		this._roadLayout = roadLayout;
		this._trafficLightLayout = trafficLightLayout;
		this._x = null;
		this._y = null;
		this._lastX = null;
		this._lastY = null;
	}

	add(x, y) {
		this._x = x;
		this._y = y;
		this._layout[this._x][this._y] = "03";
		this.emit("onCarUpdate");
	}

	go() {
		let path = this.findPath();

		this._layout[this._x][this._y] = "00";
		this._lastX = this._x;
		this._lastY = this._y;

		if(this.checkForRide()) {
			switch(path) {
				case "up":
					this._x--;

					break;
				case "down":
					this._x++;

					break;
				case "left":
					this._y--;

					break;
				case "right":
					this._y++;

					break;
			}

		}


		this._layout[this._x][this._y] = "03";
		this.emit("onCarUpdate");
	}

	findPath() {
		if(this._roadLayout[this._x - 1][this._y] === "02" && this._x - 1 !== this._lastX) {
			return "up";
		}

		if(this._roadLayout[this._x + 1][this._y] === "02" && this._x + 1 !== this._lastX) {
			return "down";
		}

		if(this._roadLayout[this._x][this._y - 1] === "02" && this._y - 1!== this._lastY) {
			return "left";
		}

		if(this._roadLayout[this._x][this._y + 1] === "02" && this._y + 1!== this._lastY) {
			return "right";
		}
	}

	findTrafficLight() {
		if(this._trafficLightLayout[this._x - 1][this._y + 1].includes("01")) {
			return this._trafficLightLayout[this._x - 1][this._y + 1];
		} else {
			return false;
		}
	}

	checkForRide() {
		let trafficLight = this.findTrafficLight();

		if(trafficLight) {
			let state = trafficLight.slice(2);

			if(state === "go") {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
}

let carLayout = new Layout("Car", 10, 10);
let car = new Car(carLayout.create(), road.getLayout(), trafficLight.getLayout());

car.add(8,1);

setInterval(() => {
	car.go();
}, 100)