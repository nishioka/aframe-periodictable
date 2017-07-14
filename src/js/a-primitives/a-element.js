// A-Frame
const AFRAME = window.AFRAME;

var extendDeep = AFRAME.utils.extendDeep;
// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
var meshMixin = AFRAME.primitives.getMeshMixin();
AFRAME.registerPrimitive('a-element', extendDeep({}, meshMixin, {
  // Preset default components.
  // These components and component
  // properties will be attached to the entity out-of-the-box.
  defaultComponents: {
    geometry: {primitive: 'plane'},
    element: {}
  },

  // Defined mappings from HTML attributes to component properties
  // (using dots as delimiters). If we set `depth="5"` in HTML,
  // then the primitive will automatically set `geometry="depth: 5"`.
  mappings: {
    symbol: 'element.symbol',
    details: 'element.details',
    mol: 'element.mol',
    x: 'element.x',
    y: 'element.y'
  }
}));
