function gyro(){
	let gyroscope = new Gyroscope();
	gyroscope.start();

	gyroscope.onreading = () => {
		document.getElementById('x').innerHTML = "Angular velocity along the X-axis " + gyroscope.x;
		document.getElementById('y').innerHTML = "Angular velocity along the Y-axis " + gyroscope.y;
		document.getElementById('z').innerHTML = "Angular velocity along the Z-axis " + gyroscope.z;

		document.getElementById('stable').innerText = userIsStable(gyroscope);
	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	}
	gyroscope.onerror = event => {
		console.log(event.error.name, event.error.message)
		document.getElementById('error').innerText = event.error.name, event.error.message;
	}
}

function userIsStable(gyro) { 
    let velMagThresh = 0.2; // Min Mag.
    document.getElementById('thresh').innerText = velMagThresh
    if (getMagnitude(gyro.x, gyro.y, gyro.z) > velMagThresh){

    	return false;
    } 
    else {
    	return true;
    }
}

function getMagnitude(x, y, z) { 
	powX = Math.pow(x, 2);
	powY = Math.pow(y, 2);
	powZ = Math.pow(z, 2);
	document.getElementById('magCalcs').innerHTML = "X^2: "+powX + " Y^2: "+ powZ + " Z^2: "+powY;


    let magnitude = Math.sqrt(powX + powY + powZ); // Calculate mag.
    document.getElementById('magnitude').innerText = magnitude
    console.log(magnitude);
    return magnitude;
}