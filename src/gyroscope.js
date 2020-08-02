var maxMag = 0;
var passed = 0;
var failed = 0;
const drunkThresh = 70;
var sloshed = false;
var gyroscope = false;
var error = false;
const dashboard = document.title == "Gyroscope Dashboard" ? true : false;
const velMagThresh = 0.8; // Min Mag.


let startGyro = () => {
	try{
		gyroscope = new Gyroscope();
		gyroscope.start();
		gyroscope.onreading = () => {
			let isStable = userIsStable(gyroscope);
			if (isStable) passed++;
			else failed++; 
			sloshed = Math.round((passed / (failed + passed)) * 100) < drunkThresh ? true : false;
			if(dashboard){
				document.getElementById('passRate').innerHTML =  Math.round((passed / (failed + passed)) * 100) + "%";
				document.getElementById('drunk').innerHTML = sloshed ? "UR SLOSHED AS!!" : "Nah u good.";
				document.getElementById('stable').innerHTML = isStable;
			}
		}
		gyroscope.onerror = event => {
			console.log(event.error.name, event.error.message)
			if(dashboard) document.getElementById('error').innerHTML = event.error.name, event.error.message;
			error = true;
		}
	}catch(error){
		console.log(error.message);
		if(dashboard) document.getElementById('error').innerHTML = error.message;
		error = true;
	}
}

let errorState = () => {
	return error;
}

let userIsStable = (gyro) => { 
    if(dashboard){
    	document.getElementById('x').innerHTML = "Angular velocity along the X-axis " + gyroscope.x;
		document.getElementById('y').innerHTML = "Angular velocity along the Y-axis " + gyroscope.y;
		document.getElementById('z').innerHTML = "Angular velocity along the Z-axis " + gyroscope.z;
    	document.getElementById('thresh').innerHTML = velMagThresh;
    }
    if (getMagnitude(gyro.x, gyro.y, gyro.z) > velMagThresh) {
    	return false;
    } 
    else {
    	return true;
    }
}

let stopGyro = () => {
	if(gyroscope) {
		gyroscope.stop();
		return sloshed;
	}else {
		return null;
	}
}

let getMagnitude = (x, y, z) => { 
	powX = Math.pow(x, 2);
	powY = Math.pow(y, 2);
	powZ = Math.pow(z, 2);
    let magnitude = Math.sqrt(powX + powY + powZ); // Calculate mag.
    
	if(maxMag < magnitude){
		maxMag = magnitude;
	}
	if(dashboard){
		document.getElementById('maxMag').innerHTML = maxMag;
    	document.getElementById('magnitude').innerHTML = magnitude;
	}
    return magnitude;
}
