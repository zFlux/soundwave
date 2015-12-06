function computeBezierPoint(t, p1, p2, p3, p4) {
  var x = Math.pow(1 - t, 3) * p1.x + 3 * Math.pow(1 - t, 2) * t * p2.x + 3 * (1 - t) * Math.pow(t, 2) * p3.x + Math.pow(t, 3) * p4.x;
  var y = Math.pow(1 - t, 3) * p1.y + 3 * Math.pow(1 - t, 2) * t * p2.y + 3 * (1 - t) * Math.pow(t, 2) * p3.y + Math.pow(t, 3) * p4.y;
  return {
    x: x,
    y: y
  };
}

function midPoint(p1, p2) {
  var x = (p1.x + p2.x) / 2;
  var y = (p1.y + p2.y) / 2;
  return {
    x: x,
    y: y
  };
}


function evenlySpacedForwardMovingPath(inputArray, numRenderedPoints, pathWidth) {
  // Once I have all the points for the bezier curve I need to loop through all of them looking for evenly spaced forward moving values of x

  // I should have the whole canvas for values of x
  var len = pathWidth
  var incr = len / numRenderedPoints;
  var j = 0;

  var evenSpacedArray = [];
  var i = 1;
  while (i < inputArray.length) {
    // if the smaller of the adjacent points x values is equal to j for then store it
    if (j == inputArray[i - 1].x) {
      evenSpacedArray[evenSpacedArray.length] = {
        x: inputArray[i - 1].x,
        y: inputArray[i - 1].y
      };
      j += incr;
    }
    // if j is between the two points then find j along the line between the two points and store the y value
    else if (j <= inputArray[i].x && j > inputArray[i - 1] < j) {
      // compute the slope
      var m = (inputArray[i].y - inputArray[i - 1].y) / (inputArray[i].x - inputArray[i - 1].x)
        // compute the value of y at x = j
      var y = m * (j - inputArray[i - 1].x) + inputArray[i - 1].y
        // store the point
      evenSpacedArray[evenSpacedArray.length] = {
        x: j,
        y: y
      };
      j += incr;
    }

    // if j is smaller than the first points x value then increment j
    else if (j < inputArray[i - 1].x) {
      j += incr;
    }
    // if j is larger than the last points x value then increment i
    else if (j > inputArray[i].x) {
      i++;
    }

  }

  return evenSpacedArray;
}

// Computes an array of equidistant dots along a bezier curve
//
// ctrlLineArray: An array of bezier curve control tangent lines
// numRenderedPoints: The number of points to render
// pathWidth: The width the curve must cover
// pathHeight: The height the curve must cover - this is only used for the first point
function bezierCurvePath(ctrlLineArray, numRenderedPoints, pathWidth, pathHeight) {

  var bezierCoordArray = [];

    var n = numRenderedPoints / ctrlLineArray.length;

    // curves are drawn using midpoints to ensure a continuous smooth bezier
    for (i = 0; i < ctrlLineArray.length - 1; i++) {

      for (t = 0; t <= 1; t += (1 / n)) {
        bezierCoordArray[bezierCoordArray.length] = computeBezierPoint(t, ctrlLineArray[i].line.midpoint, ctrlLineArray[i].line.p2, ctrlLineArray[i + 1].line.p1, ctrlLineArray[i + 1].line.midpoint);
      }

    }

  return evenlySpacedForwardMovingPath(bezierCoordArray, numRenderedPoints, pathWidth);

}
