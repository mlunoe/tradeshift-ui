import PointRecorder from './components/point-recorder/point-recorder';
import TextDisplay from './components/text-display/text-display';
import triangleCalc from './utils/triangle-calc';

ts.ui.ready(function() {
  var app = document.querySelector('#app');
  var resultsDisplayElm = app.querySelector('.results-display');
  var coordDisplayElm = app.querySelector('.coordinates-display');
  var resultsDisplay = new TextDisplay({element: resultsDisplayElm, prefix: 'Triangle Type: '});
  var coordDisplay = new TextDisplay({element: coordDisplayElm, prefix: 'Coordinates: '});

  var points = [];
  var pointRecorder;
  var onMove = function (context, coordinates) {
    if (!pointRecorder) {
      throw new Error('PointRecorder not initialized!');
    }
    coordDisplay.updateDisplay(`X: ${coordinates.x}, Y: ${coordinates.y}`)
  };

  var onClick = function (context, coordinates) {
    if (!pointRecorder) {
      throw new Error('PointRecorder not initialized!');
    }
    if (points.length === 3) {
      // Reset our points
      points = [];
      // Clear canvas
      pointRecorder.clear();
      resultsDisplay.updateDisplay('');
    }

    pointRecorder.drawPoint(coordinates.x, coordinates.y, 3, 3);
    points.push(coordinates);
    // TODO: draw lines between points. Something along these lines:
    // ctx.beginPath();
    // ctx.lineTo(p1.x, p1.y);
    // ctx.lineTo(p2.x, p2.y);
    // ctx.lineTo(p3.x, p3.y);
    // ctx.closePath(); // draws last line of the triangle
    // ctx.stroke();
    
    if (points.length === 3) {
      var lengths = triangleCalc.getDistances(points);
      var triangleType = triangleCalc.getTriangleType(lengths);
      resultsDisplay.updateDisplay(triangleType);
    }
  }

  var pointRecorderElm = app.querySelector('.point-recorder');
  pointRecorder = new PointRecorder({ onClick: onClick, onMove: onMove, element: pointRecorderElm, title: 'Triangle Type Recognizer' });
});
