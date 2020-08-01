function gyro(){
	let gyroscope = new Gyroscope({frequency: 60});

	gyroscope.addEventListener('reading', e => {
		var x = document.getElementById('x');
		var y = document.getElementById('y');
		var z = document.getElementById('z');

		x.innerText = "Angular velocity along the X-axis " + gyroscope.x;
		y.innerText = "Angular velocity along the Y-axis " + gyroscope.y;
		z.innerHText = "Angular velocity along the Z-axis " + gyroscope.z;

	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	});
	gyroscope.start();
}