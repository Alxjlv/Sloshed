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
    let velMagThresh = 0.8; // Min Mag.
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
	total = powX + powY + powZ;
	document.getElementById('magCalcs').innerHTML = total;
    let magnitude = Math.sqrt(total); // Calculate mag.
    let maxMag = magnitude;
    if(!localStorage.getItem('maxMag')){
    	localStorage.setItem('maxMag',magnitude);
    }else{
    	let maxMag = localStorage.getItem('maxMag');
    	if(maxMag<magnitude){
    		maxMag = magnitude;
    		localStorage.setItem('maxMag',magnitude);
    	}
    }
    document.getElementById('maxMag').innerHTML = maxMag;
    document.getElementById('magnitude').innerText = magnitude;
    console.log(magnitude);
    return magnitude;
}