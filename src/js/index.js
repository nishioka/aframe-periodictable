'use strict';

// Dependencies we load from vendor.js
import 'aframe';

// project entry
import './a-systems';
import './a-shaders';
import './a-components';
import './a-primitives';

// Load Application
import './a-project';

import { elements } from 'data/elements';

if (module.hot) {
  module.hot.accept();
}
// Load html
let aScene = require('../scene/index.hbs');
document.addEventListener('DOMContentLoaded', function () {
  document.body.innerHTML = aScene({
    defaults: {
      camera: {
        position: '0 1.764 0'
      },
      sky: {
        color: '#707070'
      },
      elements: elements
    }
  });
});
