/**
 * Given a list of points this function will return a list of distances between consecutive points
 * @typedef Point
 * @type {Object}
 * @property {Number} x x-oordinate for point
 * @property {Number} y y-oordinate for point
 * 
 * @param  {Point[]} points list of points to calculate distances between
 * @return {Number[]} list of distances between given points
 */
function getDistances(points) {
  var length = points.length;
  return points.map(function (point, index) {
    var nextIndex = index + 1;
    // When out of bounds use the initial point
    if (nextIndex === length) {
      nextIndex = 0;
    }
    var next = points[nextIndex];
    // Distance between points
    return Math.sqrt(Math.pow(Math.abs(next.x - point.x), 2) + Math.pow(Math.abs(next.y - point.y), 2));
  });

}

/**
 * Verifies if the provided lengths form a triangle. Throws an error if this is not the case
 * @param  {Number[]} lengths length of each side of the triangle
 */
function verifyTriangle(lengths) {
  var length = lengths.length;
  if (lengths.length !== 3) {
    throw new Error(`Cannot get triangle type with ${length} lengths. Please use 3 lengths.`);
  }

  var totalSideSum = lengths.reduce(function (accum, current) {
    return accum + current;
  });

  lengths.forEach(function (curentSide) {
    // Check Triangle Inequality Theorem
    if (totalSideSum - curentSide <= curentSide) {
      throw new Error(`This is not a valid triangle. The sum of two sides must be greater than the third side. ${totalSideSum - curentSide} ≯ ${curentSide}`);
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

module.exports = {
  getDistances,
  getTriangleType,
  TRIANGLE_TYPES
};
