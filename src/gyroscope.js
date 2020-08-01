function gyro(){
	let gyroscope = new Gyroscope({frequency: 60});

	gyroscope.addEventListener('reading', e => {
		document.getElementById('x').innerHTML("Angular velocity along the X-axis " + gyroscope.x)
		document.getElementById('y').innerHTML("Angular velocity along the Y-axis " + gyroscope.y)
		document.getElementById('z').innerHTML("Angular velocity along the Z-axis " + gyroscope.z)


	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	});
	gyroscope.start();
}