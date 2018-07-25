function getLengths(points) {
  var length = points.length;
  return points.map(function (point, index) {
    var nextIndex = index + 1;
    if (nextIndex === length) {
      nextIndex = 0;
    }
    var next = points[nextIndex];
    // Distance between points
    return Math.sqrt(Math.pow(next.x - point.x, 2) + Math.pow(next.y - point.y, 2));
  });

}

/**
 * Verifies if the provided lengths form a triangle. Throws an error if this is not the case
 * @param  {Number[]} lengths length of each side of the triangle
 */
function verifyTriangle(lengths) {
  if (lengths.length !== 3) {
    throw new Error(`Cannot get triangle type with ${lengths.length} lengths. Please use 3 lengths.`);
  }

  lengths.forEach(function (first, index) {
    var secondIndex = index + 1;
    if (secondIndex === length) {
      secondIndex = 0;
    }
    var second = lengths[secondIndex];

    var thirdIndex = secondIndex + 1;
    if (thirdIndex === length) {
      thirdIndex = 0;
    }
    var third = lengths[thirdIndex];
    // Check Triangle Inequality Theorem
    if (first + second <= third) {
      throw new Error('This is not a valid triangle. The sum of two sides must be greater than the third side.');
    }
  });
}

function getTriangleType(lengths) {
  verifyTriangle(lengths);
  var count = getMaxEqualLengths(lengths);
  switch (count) {
    case 1:
     return TRIANGLE_TYPES.SCALENE;
    case 2:
     return TRIANGLE_TYPES.ISOSCELES;
    case 3:
     return TRIANGLE_TYPES.EQUILATERAL;
    default:
      return TRIANGLE_TYPES.UNKNOWN;
  }
}

function getMaxEqualLengths(lengths) {
  var map = new Map();
  lengths.forEach(function (length) {
    if (typeof map.get(length) === 'undefined') {
      map.set(length, 0);
    }
    var lengthCount = map.get(length);
    // Increment length count
    map.set(length, lengthCount + 1);
  });

  var result = 0;
  for (var value of map.values()) {
    if (value > result) {
      result = value;
    }
  }

  return result;
}

var TRIANGLE_TYPES = {
  SCALENE: 'SCALENE',
  ISOSCELES: 'ISOSCELES',
  EQUILATERAL: 'EQUILATERAL',
  UNKNOWN: 'UNKNOWN'
};

export default {
  getLengths,
  getTriangleType,
  TRIANGLE_TYPES
};
