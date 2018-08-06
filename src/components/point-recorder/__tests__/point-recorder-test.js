var sinon = require('sinon');
var jsdom = require('mocha-jsdom');
var assert = require('assert');
var PointRecorder = require('../point-recorder');

describe('PointRecorder', function () {
  jsdom();

  describe('#constructor()', function () {
    var getSpy;

    before(function () {
      getSpy = sinon.spy();

      // Mocking global property 'ts'
      global.ts = {
        ui: {
          get: getSpy
        }
      };
    });

    after(function () {
      // Clean up global property
      delete global.ts;
    })

    it('should throw if it does not receive a canvas element', function () {
      var pointRecorderElement = document.createElement('div');
      var shouldThrow = function () {
        new PointRecorder({ element: pointRecorderElement });
      };
      assert.throws(shouldThrow);
    });

    it('should not throw if it receives a canvas element', function () {
      var pointRecorderElement = document.createElement('div');
      var canvas = document.createElement('canvas');
      pointRecorderElement.appendChild(canvas);
      var shouldNotThrow = function () {
        new PointRecorder({ element: pointRecorderElement });
      }
      assert.doesNotThrow(shouldNotThrow);
    });

    it('should attach provided click handler', function () {
      var pointRecorderElement = document.createElement('div');
      var canvas = document.createElement('canvas');
      pointRecorderElement.appendChild(canvas);
      var onClickSpy = sinon.spy();
      new PointRecorder({ element: pointRecorderElement, onClick: onClickSpy });

      // Simulate click event
      var event = document.createEvent("HTMLEvents");
      event.initEvent("click", false, true);
      canvas.dispatchEvent(event);

      sinon.assert.calledOnce(onClickSpy);
    });

    it('should attach provided mousemove handler', function () {
      var pointRecorderElement = document.createElement('div');
      var canvas = document.createElement('canvas');
      pointRecorderElement.appendChild(canvas);
      var onMoveSpy = sinon.spy();
      new PointRecorder({ element: pointRecorderElement, onMove: onMoveSpy });

      // Simulate mousemove event
      var event = document.createEvent("HTMLEvents");
      event.initEvent("mousemove", false, true);
      canvas.dispatchEvent(event);

      sinon.assert.calledOnce(onMoveSpy);
    });

    it('should use fillRect to draw on the canvas', function () {
      var pointRecorderElement = document.createElement('div');
      var canvas = document.createElement('canvas');
      pointRecorderElement.appendChild(canvas);
      
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
      
      var pointRecorder = new PointRecorder({ element: pointRecorderElement });
      pointRecorder.clear();
      pointRecorder.drawPoint(1, 2, 3, 4);

      sinon.assert.calledWith(clearRectSpy, 0, 0, 100, 200);
      sinon.assert.calledWith(fillRectSpy, 1, 2, 3, 4);
    });

    it('should use the ts.ui.get API to get the board element', function () {
      var pointRecorderElement = document.createElement('div');
      var canvas = document.createElement('canvas');
      pointRecorderElement.appendChild(canvas);
      var onClickSpy = sinon.spy();
      new PointRecorder({ element: pointRecorderElement, onClick: onClickSpy, title: 'foo' });
      
      sinon.assert.calledWith(getSpy, pointRecorderElement);
    });
  });
});
