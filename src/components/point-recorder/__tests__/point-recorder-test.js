var sinon = require('sinon');
var jsdom = require('mocha-jsdom');
var assert = require('assert');
var PointRecorder = require('../point-recorder');

describe('PointRecorder', function () {
  jsdom();

  describe('#constructor()', function () {
    it('should throw if it does not receive a canvas element', function () {
      var div = document.createElement('div');
      var shouldThrow = function () {
        new PointRecorder({ element: div });
      };
      assert.throws(shouldThrow);
    });

    it('should not throw if it receives a canvas element', function () {
      var canvas = document.createElement('canvas');
      var shouldNotThrow = function () {
        new PointRecorder({ element: canvas });
      }
      assert.doesNotThrow(shouldNotThrow);
    });

    it('should attach provided click handler', function () {
      var canvas = document.createElement('canvas');
      var onClickSpy = sinon.spy();
      new PointRecorder({ element: canvas, onClick: onClickSpy });

      // Simulate click event
      var event = document.createEvent("HTMLEvents");
      event.initEvent("click", false, true);
      canvas.dispatchEvent(event);

      sinon.assert.calledOnce(onClickSpy);
    });

    it('should use fillRect to draw on the canvas', function () {
      var canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 200;
      var clearRectSpy = sinon.spy();
      var fillRectSpy = sinon.spy();
      canvas.getContext = function () {
        return {
          clearRect: clearRectSpy,
          fillRect: fillRectSpy
        }
      };
      
      var pointRecorder = new PointRecorder({ element: canvas });
      pointRecorder.clear();
      pointRecorder.drawPoint(1, 2, 3, 4);

      sinon.assert.calledWith(clearRectSpy, 0, 0, 100, 200);
      sinon.assert.calledWith(fillRectSpy, 1, 2, 3, 4);
    });
  });
});
