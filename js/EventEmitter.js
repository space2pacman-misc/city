class EventEmitter {
	emit(event) {
		dispatchEvent(new CustomEvent(event));
	}

	on(event, callback) {
		window.addEventListener(event, callback);
	}
}