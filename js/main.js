Layout.field = document.querySelector(".field");

let trafficLightLayout = new Layout("TrafficLight", 10, 10);
let trafficLight = new TrafficLight(trafficLightLayout.create());

trafficLight.add(2, 2);
trafficLight.enable(2, 2);

class Road extends EventEmitter {
	constructor(layout) {
		super();
		this._layout = layout;
	}

	add(x, y) {
		this._layout[x][y] = "02";
		this.emit("onRoadUpdate");
	}
}
let roadLayout = new Layout("Road", 10, 10);
let road = new Road(roadLayout.create());

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