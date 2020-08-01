function gyro(){
	document.getElementById('x').innerText = "testing"
	let gyroscope = new Gyroscope();
	gyroscope.start();

	gyroscope.onreading = () => {
		document.getElementById('x').innerText = "Angular velocity along the X-axis " + gyroscope.x;
		document.getElementById('y').innerText = "Angular velocity along the Y-axis " + gyroscope.y;
		document.getElementById('z').innerHText = "Angular velocity along the Z-axis " + gyroscope.z;

	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	}
	gyroscope.onerror = event => {

		console.log(event.error.name, event.error.message)
		document.getElementById('error').innerText = event.error.name, event.error.message;
	}
}

function gyro2(){
	let sensor = new Gyroscope();
sensor.start();

sensor.onreading = () => {
    console.log("Angular velocity around the X-axis " + sensor.x);
    console.log("Angular velocity around the Y-axis " + sensor.y);
    console.log("Angular velocity around the Z-axis " + sensor.z);
};

sensor.onerror = event => console.log(event.error.name, event.error.message);
}