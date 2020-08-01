function userIsStable(gyro) { 
    let velMagThresh = 0.2; // Min Mag.
    if (getMagnitude(gyro.x, gyro.y, gyro.z) > velMagThresh) return false;
    else return true;
}

function getMagnitude(x, y, z) { 
    let magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)); // Calculate mag.
    console.log(magnitude);
    return magnitude;
}