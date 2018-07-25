var assert = require('assert');
var TextDisplay = require('../text-display');

describe('TextDisplay', function () {
  describe('#updateDisplay()', function () {
    it('should throw if it receives undefined', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      var shouldThrow = function () {
        textDisplay.updateDisplay();
      };
      assert.throws(shouldThrow);
    });

    it('should throw if it receives a number', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      var shouldThrow = function () {
        textDisplay.updateDisplay(1);
      };
      assert.throws(shouldThrow);
    });

    it('should throw if it receives a bool', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      var shouldThrow = function () {
        textDisplay.updateDisplay(false);
      };
      assert.throws(shouldThrow);
    });

    it('should add element class `hidden` when value is empty', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      textDisplay.updateDisplay('');

      assert.ok(div.classList.contains('hidden'));
    });

    it('should remove element class `hidden` when value is not empty after being empty', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      textDisplay.updateDisplay('');
      textDisplay.updateDisplay('foo');

      assert.ok(!div.classList.contains('hidden'));
    });

    it('updates the elements contents', function () {
      var div = document.createElement('div');
      var textDisplay = new TextDisplay({ element: div });
      textDisplay.updateDisplay('foo');

      assert.equal(div.innerHTML, 'foo');
    });
  });
});
