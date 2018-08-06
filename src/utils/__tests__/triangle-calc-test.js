var assert = require('assert');
var triangleCalc = require('../triangle-calc');

describe('triangleCalc', function () {
  describe('#getDistances()', function () {
    it('should return same amount as given', function () {
      var p1 = { x: 1, y: 1 };
      var p2 = { x: 2, y: 2 };
      var p3 = { x: 3, y: 3 };
      var p4 = { x: 4, y: 4 };
      assert.equal(triangleCalc.getDistances([]).length, 0);
      assert.equal(triangleCalc.getDistances([p1, p2, p3]).length, 3);
      assert.equal(triangleCalc.getDistances([p1, p2, p3, p4]).length, 4);
    });

    it('should calculate distances between given points correctly', function () {
      var p1 = { x: 1, y: 5 };
      var p2 = { x: 2, y: 4 };
      var p3 = { x: 3, y: 7 };
      var p4 = { x: 4, y: 8 };
      assert.deepEqual(triangleCalc.getDistances([p1, p2, p3]), [1.4142135623730951, 3.1622776601683795, 2.8284271247461903]);
      assert.deepEqual(triangleCalc.getDistances([p1, p2, p3, p4]), [1.4142135623730951, 3.1622776601683795, 1.4142135623730951, 4.242640687119285]);
    });

    it('should throw an error given invalid input', function () {
      var shouldThrow = function () {
        triangleCalc.getDistances(null);
      }
      assert.throws(shouldThrow);
    });
  });

  describe('#getTriangleType', function () {
    it('should not throw when lengths uphold the Triangle Inequality Theorem', function () {
      assert.equal(triangleCalc.getTriangleType([1.2, 2, 3]), triangleCalc.TRIANGLE_TYPES.SCALENE);
    });

    it('should correctly detect a isosceles', function () {
      assert.equal(triangleCalc.getTriangleType([1.2, 1.2, 2]), triangleCalc.TRIANGLE_TYPES.ISOSCELES);
    });

    it('should correctly detect a equilateral', function () {
      assert.equal(triangleCalc.getTriangleType([1.2, 1.2, 1.2]), triangleCalc.TRIANGLE_TYPES.EQUILATERAL);
    });

    it('should throw when lengths uphold the Triangle Inequality Theorem', function () {
      var shouldThrow = function () {
        triangleCalc.getTriangleType([1, 2, 3]);
      }
      assert.throws(shouldThrow);
    });

    it('should throw when not correct length', function () {
      [
        [],
        [1],
        [1, 1],
        // [1, 1, 1], <- this is the only valid size
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1]
      ].forEach(function (lengths) {
        var shouldThrow = function () {
          triangleCalc.getTriangleType(lengths);
        }
        assert.throws(shouldThrow);
      });
    });
  });
});
