// Estimate node x coordinate (polar to cartesian)
function estimate_x(d){
    // -d.theta for clockwise degrees
    return W_WIDTH - (d.r * ZOOM_R * Math.sin((-d.theta) * Math.PI / 180));
}


// Estimate node y coordinate (polar to cartesian)
function estimate_y(d){
    // -d.theta for clockwise degrees
    return W_HEIGHT - (d.r * ZOOM_R * Math.cos((-d.theta) * Math.PI / 180));
}