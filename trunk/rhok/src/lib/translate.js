// Constant for Height
var H = 0;

// Constant for Length
var L = 1;

// Constant for Theta
var THETA = 2;

// Constant for X coordinate
var X = 0;

// Constant for Y coordinate
var Y = 1;

// Convert degrees to radians
function degreesToRadians( degrees ) {
	return degrees * Math.PI / 180.0;
}

// Convert radians to degrees
function radiansToDegrees( radians ) {
	return radians * 180.0 / Math.PI;
}

// Given, the div IDs for the h/l/theta form elements and completes the missing value
function autocomplete( h_id, l_id, theta_id ) {
	var h = document.getElementById(h_id).value;
	var l = document.getElementById(l_id).value;
	var theta = document.getElementById(theta_id).value;
	
	if ( l && theta && !h) {
		document.getElementById(h_id).value = getH( l, theta );
	} else if ( h && theta && !l ) {
		document.getElementById(l_id).value = getL( h, theta );
	} else if( h && l && !theta ) {
		document.getElementById(theta_id).value = getTheta( h, l );
	}
}

// Get the height value given length and theta (in degrees)
function getH( l, theta ) {
	return l * Math.sin( degreesToRadians( theta ) );
}

// Get the length value given height and theta(in degrees)
function getL( h, theta ) {
	return h / Math.sin( degreesToRadians( theta ) );
}

// Get the theta value (in degrees) given the height and length
function getTheta( h, l ) {
	return radiansToDegrees( Math.asin( h / l ) );
}

// Given a point, height, length and theta (in degrees), calculates the next X,Y coordinate
function getNextPoint( x, y, height, length, theta ) {
	// given an [x, y] coordinate, length, and theta angle, computes the next [x, y] coordiate
	return [Math.round( x + length * Math.cos( degreesToRadians( theta ) ) ), Math.round( y - height )];
}

// Given data array, computes total height
function getTotalHeight(data) {

	var totalHeight = 0;
	for (var i=0; i < data.length; i++) {
		totalHeight += data[i][H];
	}
	
	return totalHeight;
}

// Given data array, computes total width
function getTotalWidth( data ) {
	// given data array, computes total width
	var totalWidth = 0;
	for (var i=0; i < data.length; i++) {
		totalWidth += data[i][L];
	}
	
	return totalWidth;
}

// Given data array, generates array of XY coordinates
function generateXYPoints( data ) {
	if(data){
    var originHeight = getTotalHeight( data );

    // one more point than there are measurements
    var xyPoints = new Array( data.length + 1 );

    xyPoints[0] = [0, originHeight];

    for ( var i=0; i < data.length; i++ ) {
        xyPoints[i+1] = getNextPoint( xyPoints[i][X], xyPoints[i][Y], data[i][H], data[i][L], data[i][THETA] );
    }

    return xyPoints;
  } else {
    return null;
  }
}