import extras from 'aframe-extras';

// A-Frame
const AFRAME = window.AFRAME;

AFRAME.registerComponent('ocean', extras.primitives['a-ocean'].Component);
AFRAME.registerPrimitive('a-ocean', extras.primitives['a-ocean'].Primitive);
