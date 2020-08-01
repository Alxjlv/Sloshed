var maxMag = 0;
var passed = 0;
var failed = 0;
var drunkThresh = 70;
var sloshed = false;
var gyroscope = false;
var error = false;

let startGyro = () => {
	try{
		gyroscope = new Gyroscope();
		gyroscope.start();
		gyroscope.onreading = () => {
			document.getElementById('x').innerHTML = "Angular velocity along the X-axis " + gyroscope.x;
			document.getElementById('y').innerHTML = "Angular velocity along the Y-axis " + gyroscope.y;
			document.getElementById('z').innerHTML = "Angular velocity along the Z-axis " + gyroscope.z;

		let isStable = userIsStable(gyroscope);
		if (isStable) passed++;
		else failed++; 
		document.getElementById('passRate').innerText =  Math.round((passed / (failed + passed)) * 100) + "%";
		sloshed = Math.round((passed / (failed + passed)) * 100) < drunkThresh ? true : false;
		document.getElementById('drunk').innerText = sloshed ? "UR SLOSHED AS!!" : "Nah u good.";
		document.getElementById('stable').innerText = isStable;
	  	console.log("Angular velocity along the X-axis " + gyroscope.x);
	  	console.log("Angular velocity along the Y-axis " + gyroscope.y);
	  	console.log("Angular velocity along the Z-axis " + gyroscope.z);
	}
	gyroscope.onerror = event => {
		console.log(event.error.name, event.error.message)
		document.getElementById('error').innerText = event.error.name, event.error.message;
		error = true;
	}
	}catch(error){
		console.log(error.message);
		document.getElementById('error').innerText = error.message;
		error = true;
	}
}

let errorState = () => {
	return error;
}

let userIsStable = (gyro) => { 
    let velMagThresh = 0.8; // Min Mag.
    document.getElementById('thresh').innerText = velMagThresh;
    if (getMagnitude(gyro.x, gyro.y, gyro.z) > velMagThresh) {
    	return false;
    } 
    else {
    	return true;
    }
}

function playSound(){
	let audio = new Audio("src/slosh.mp3");
	console.log(audio);
	audio.Play();
}

let stopGyro = () => {
	if(gyroscope) {
		gyroscope.stop();
		if (sloshed) playSound();
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
	
    document.getElementById('maxMag').innerHTML = maxMag;
    document.getElementById('magnitude').innerText = magnitude;
    console.log(magnitude);
    return magnitude;
}
