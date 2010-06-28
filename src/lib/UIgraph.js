 var graph = JXG.JSXGraph.initBoard('box', {boundingbox: [-5,100,150,-5], showNavigation: 0, snapToGrid: true, snapSizeX: 2, snapSizeY: 2, originX: 0, originY: 500, unitX: 150, unitY: 100, axis:true});

	  var geometryLines = new Array();
	  var geometryPoints = new Array();
	  var soilOffsets = new Array();
	  var soilPoints = new Array();
	  var soilLines = new Array(4);
	  soilLines[0] = new Array();
	  soilLines[1] = new Array();
	  soilLines[2] = new Array();
	  soilLines[3] = new Array();
	  var waterTableOffsets = new Array();
	  var waterTableLines = new Array();
	  var waterTablePoints = new Array();
	  var geometryColor = '#000000', soilColor = new Array('#DCBE84',  '#C7A675',  '#AA3961',  '#997B62'), waterColor = '#B9E2FA';


		function plotArrayOfPoints(pointsArray, dashed, lineColor){
			//clear elements from array
			var storageArray = new Array();

			//how large is storageArray? if its too small, make it large enough to hold all of the points
			if(storageArray.length < pointsArray.length){
				storageArray = new Array(pointsArray.length);
			}
			// for every set of points in the array, create a point on the graph.
			for(var x = 0; x < pointsArray.length - 1; x++){
				storageArray[x] = createLine(pointsArray[x][0],pointsArray[x][1], pointsArray[x+1][0],pointsArray[x+1][1], dashed, lineColor)
			}
			updateBoundingBox();
			return storageArray;
		}



		function setSoilOffsets(inArray){
			if(soilOffsets.length != inArray.length){
				soilOffsets = new Array(inArray.length);
			}
			soilOffsets = inArray;
		}

		function setWaterTableOffsets(inArray){
			if(waterTableOffsets.length != inArray.length){
				waterTableOffsets = new Array(inArray.length);
			}
			waterTableOffsets = inArray;
		}

		function setGeometry(inArray){
			if(geometryPoints.length != inArray.length){
				geometryPoints = new Array(inArray.length);
			}
			for(var x = 0; x < inArray.length; x++){
				geometryPoints[x] = new Array(inArray[x][0], inArray[x][1]);
			}
		}

		function updateGraph(){
			if(validateGeometry()){
				clearArrayOfElements(geometryLines);
				geometryLines = plotArrayOfPoints(geometryPoints, false, geometryColor);
			}
			if(validateSoilData()){
				convertSoilOffsetToPoints();

				for(var x = 0; x < soilPoints.length; x++){
					clearArrayOfElements(soilLines[x]);
					soilLines[x] = plotArrayOfPoints(soilPoints[x],false, soilColor[x])
				}
			}
			if(validateWaterTableData()){
				convertWaterTableOffsetToPoints();
				clearArrayOfElements(waterTableLines);
				waterTableLines = plotArrayOfPoints(waterTablePoints,  false, waterColor)
			}
		}

		function validateWaterTableData(){
			//no negatives
			if(waterTableOffsets && waterTableOffsets.length > 0){
				for(var pNum = 0; pNum < waterTableOffsets[0].length; pNum++){

				//check to make sure offset is less than geometry and >= 0
					if(waterTableOffsets[pNum] > geometryPoints[pNum][1] || waterTableOffsets[pNum] < 0){
						alert("Point number " + pNum +  " in the water table is too high or is negative.");
						return false;
					}
				}
				return true;
			} else {
				return false;
			}


		}

		function validateSoilData(){
			//expected data format:
			//    p1     p2   ...
			// 0  offset offset
			// 1
			// ...
			// soilOffsets[depth][offset1, offset2, offset3 ...]
		  //check dimensions - should be the same as the number of points in geometry
		  //check values - should be increasing for each x,
		  //the offset can't be greater than the geometry for that point (ie, no negative points)
			if(soilOffsets && soilOffsets.length > 0){
				if(soilOffsets[0].length == geometryPoints.length){
					for(var depth = 0; depth < soilOffsets.length; depth++){
						for(var pNum = 0; pNum < soilOffsets[0].length; pNum++){
						//check for increasing
							if(depth >= 1 && soilOffsets[depth][pNum] < soilOffsets[depth][pNum-1]){
								alert("Point number " + pNum + " at depth " + depth + " is higher than the one that came before it.");
								return false;
							}
						//check to make sure offset is less than geometry and >= 0
							if(soilOffsets[depth][pNum] > geometryPoints[pNum][1] || soilOffsets[depth][pNum] < 0){
								alert("Point number " + pNum + " at depth " + depth + " in the soil data is greater than the geometry. Please make it lower.");
								return false;
							}
						}
						return true;

					}
				} else {
					alert("There are  " + soilOffsets[0].length + " data values for the soil table but " + geometryPoints.length + " values for the geometry.");
					return false;
				}
			} else {
				return false;
			}

		}

		function convertSoilOffsetToPoints(){
		//soil data comes in as offsets in terms of each point in the geometry. So, to calculate each value, we need to iterate through the geometry.
			//resize soil points array
			var depth = soilOffsets.length;
			var numPPoints = soilOffsets[0].length;
			soilPoints = new Array(depth);
			for(var currentDepth = 0; currentDepth < depth; currentDepth++){
				soilPoints[currentDepth] = new Array(numPPoints);
				for(var pNum = 0; pNum < numPPoints; pNum++){
					var currentGeometryXCoord = geometryPoints[pNum][0], currentGeometryYCoord = geometryPoints[pNum][1];
					soilPoints[currentDepth][pNum] = new Array(currentGeometryXCoord, currentGeometryYCoord - soilOffsets[currentDepth][pNum]);
				}
			}

		}

		function convertWaterTableOffsetToPoints(array){

			var numPPoints = waterTableOffsets.length;
			waterTablePoints = new Array(numPPoints);
			waterTablePoints = new Array(numPPoints);
			for(var pNum = 0; pNum < numPPoints; pNum++){
				var currentGeometryXCoord = geometryPoints[pNum][0], currentGeometryYCoord = geometryPoints[pNum][1];
				waterTablePoints[pNum] = new Array(currentGeometryXCoord, currentGeometryYCoord - waterTableOffsets[pNum]);
			}


		}

		function validateGeometry(){
		//can't have slopes above 90 degrees.
			for(var p = 1; p < geometryPoints.length; p++){
				var slope = (geometryPoints[p][1] - geometryPoints[p-1][1] )/(geometryPoints[p][0] - geometryPoints[p-1][0]);
				if(geometryPoints[p][0] - geometryPoints[p-1][0] == 0 && geometryPoints[p][1] - geometryPoints[p-1][1] != 0){
					//slope is undefined - vertical line
					return true;
				} else if(slope  > 0){
					alert("Point number " + p + " has caused a slope greater than 0 degrees.");
					return false;
				}
				if(geometryPoints[p][0] < geometryPoints[p-1][0]){
					alert("Point number " + p + " has a smaller X value than the one before it.");
					return false;
				}
			}
			return true;
		}

		function clearArrayOfElements(array){
			if(array){
				for(var x = 0; x < array.length; x++){
					graph.removeObject(array[x]);
				}
			}
		}

		function updateBoundingBox(){
			var lastPointNumber = geometryPoints.length;
			var leftGraphBuffer = geometryPoints[lastPointNumber-1][0]/20*-1;
			var bottomGraphBuffer = geometryPoints[0][1]/20*-1;
			graph.setBoundingBox(new Array(leftGraphBuffer, geometryPoints[0][1], geometryPoints[lastPointNumber-1][0], bottomGraphBuffer), false);

		}
		function clearElement(element){
			graph.removeObject(element);
		}

		function createPoint( xCoord, yCoord){
			return graph.createElement('point', [xCoord,yCoord]);
		}

		function createLine( xCoord1, yCoord1, xCoord2, yCoord2, dashed, lineColor){
			if(dashed == true){
				return graph.createElement('line',[[xCoord1,yCoord1],[xCoord2,yCoord2]], {straightFirst:false, straightLast:false, strokeWidth:3, strokeColor: lineColor, dash:2});
			} else {
				return graph.createElement('line',[[xCoord1,yCoord1],[xCoord2,yCoord2]], {straightFirst:false, straightLast:false, strokeWidth:3, strokeColor: lineColor});
			}
	}