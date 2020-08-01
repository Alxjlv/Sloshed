function gyro(){
	let gyroscope = new Gyroscope();
	gyroscope.start();

	gyroscope.onreading = () => {
		document.getElementById('x').innerText = "Angular velocity along the X-axis " + gyroscope.x;
		document.getElementById('y').innerText = "Angular velocity along the Y-axis " + gyroscope.y;
		document.getElementById('z').innerText = "Angular velocity along the Z-axis " + gyroscope.z;

	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	}
	gyroscope.onerror = event => {
		console.log(event.error.name, event.error.message)
		document.getElementById('error').innerText = event.error.name, event.error.message;
	}
}