function getRelativeCoords(event) {
  return { x: event.offsetX, y: event.offsetY };
}
/**
 * PointRecoder - functionality for recording points on a canvas element
 * @typedef PointRecoder
 * @type {Object}
 * @property {Function} clear clears the whole canvas area
 * @property {Function} drawPoint draws a point on the canvas
 * 
 * @param {Object} options
 * @property {HTMLElement} element Canvas element to attach functionality to
 * @property {Function} onClick Callback to be called when canvas is clicked
 * @returns {PointRecoder}
 */
module.exports = function PointRecorder(options) {
  options || (options = {});
  var element = options.element;
  var title = options.title;
  var canvas = element.querySelector('canvas');

  // Adds a title to the board, if it exists
  if (title) {
    ts.ui.get(element, function(board) {
      board.title(title);
    });
  }

  if (canvas.nodeName !== 'CANVAS') {
    throw new Error(`PointRecorder only works with 'HTMLCanvasElement' elements. Please provide a canvas element in options.element.`);
  }
  var context = canvas.getContext('2d');

  canvas.addEventListener('click', function (event) {
    if (options.onClick) {
      var coordinates = getRelativeCoords(event, canvas);
      options.onClick(context, coordinates);
    }
  });

  return {
    clear: function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    drawPoint: function (x, y, width, height) {
      context.fillRect(x, y, width, height);
    }
  };
};
