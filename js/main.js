let field = document.querySelector(".field");
let trafficLightLayout = new Layout("TrafficLight", field, 10, 10);
let trafficLight = new TrafficLight(trafficLightLayout.create());

trafficLight.add(2, 2);
trafficLight.enable(2, 2);