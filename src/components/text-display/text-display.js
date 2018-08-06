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
module.exports = function TextDisplay(options) {
  options || (options = {});
  var element = options.element;
  var prefix = options.prefix || '';
  if (typeof prefix !== 'string') {
    throw new Error(`TextDisplay can only accept string prefixs. Received type "${typeof prefix}".`);
  }

  return {
    updateDisplay: function (value) {
      if (typeof value !== 'string') {
        throw new Error(`TextDisplay can only accept string values. Received type "${typeof value}".`);
      }
      // Toggle element display depening on value
      if (value) {
        element.classList.remove('hidden');  
      } else {
        element.classList.add('hidden');  
      }

      element.innerHTML = `${prefix}${value}`;
    }
  };
};
