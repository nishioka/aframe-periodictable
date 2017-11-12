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

const AFRAME = window.AFRAME;
const THREE = AFRAME.THREE;

if (module.hot) {
  module.hot.accept();
}
// Load html
let aScene = require('../scene/index.hbs');
document.addEventListener('DOMContentLoaded', function () {
  elements.forEach(getAnimationPosition());

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

  // set trigger for animation
  const init2randomEls = document.querySelectorAll('#init-random');
  init2randomEls.forEach(element => {
    // console.log(element.parentNode);
    element.addEventListener('animationend', function () {
    // console.log('random-table-start');
      this.parentNode.emit('random-table-start');
    });
  });
  const random2tableEls = document.querySelectorAll('#random-table');
  random2tableEls.forEach(element => {
    element.addEventListener('animationend', function () {
    // console.log('table-sphere-start');
      this.parentNode.emit('table-sphere-start');
    });
  });
  const grid2tableEls = document.querySelectorAll('#grid-table');
  grid2tableEls.forEach(element => {
    element.addEventListener('animationend', function () {
    // console.log('table-sphere-start');
      this.parentNode.emit('table-sphere-start');
    });
  });
  const table2sphereEls = document.querySelectorAll('#table-sphere');
  table2sphereEls.forEach(element => {
    element.addEventListener('animationend', function () {
    // console.log('sphere-helix-start');
      this.parentNode.emit('sphere-helix-start');
    });
  });
  const sphere2helixEls = document.querySelectorAll('#sphere-helix');
  sphere2helixEls.forEach(element => {
    element.addEventListener('animationend', function () {
    // console.log('helix-grid-start');
      this.parentNode.emit('helix-grid-start');
    });
  });
  const helix2gridEls = document.querySelectorAll('#helix-grid');
  helix2gridEls.forEach(element => {
    element.addEventListener('animationend', function () {
    // console.log('grid-table-start');
      this.parentNode.emit('grid-table-start');
    });
  });
});

const getAnimationPosition = function () {
  return (element, index) => {
    element.number = index + 1;
    const object = new THREE.Object3D();
    object.rotation.order = 'YXZ';
    const vector = new THREE.Vector3();
    const degree = new THREE.Vector3();
    let theta;

    // 変形用の配置の計算
    element.randomPosition = `${Math.random() * 4000 - 2000} ${Math.random() * 4000 - 2000} ${Math.random() * 4000 - 2000}`;

    element.tablePosition = `${element.x * 140 - 1330} ${990 - element.y * 180} -1000`;

    const spherical = new THREE.Spherical();
    const phi = Math.acos(2 * index / elements.length - 1);
    theta = Math.sqrt(elements.length * Math.PI) * phi;
    spherical.set(800, phi, theta);
    object.position.setFromSpherical(spherical);
    // vector.copy(object.position).multiplyScalar(2);
    vector.x = 0;
    vector.y = 0;
    vector.z = 0;
    object.lookAt(vector);
    degree.x = THREE.Math.radToDeg(object.rotation.x);
    degree.y = THREE.Math.radToDeg(object.rotation.y);
    degree.z = THREE.Math.radToDeg(object.rotation.z);

    element.spherePosition = `${object.position.x} ${object.position.y} ${object.position.z}`;
    element.sphereRotation = `${degree.x} ${degree.y} ${degree.z}`;

    const cylindrical = new THREE.Cylindrical();
    const height = 450 - index * 8;
    theta = index * 0.175 + Math.PI;
    cylindrical.set(900, theta, height);
    object.position.setFromCylindrical(cylindrical);
    vector.x = 0;
    vector.y = object.position.y;
    vector.z = 0;
    // vector.x = object.position.x * 2;
    // vector.y = object.position.y;
    // vector.z = object.position.z * 2;
    object.lookAt(vector);
    degree.x = THREE.Math.radToDeg(object.rotation.x);
    degree.y = THREE.Math.radToDeg(object.rotation.y);
    degree.z = THREE.Math.radToDeg(object.rotation.z);

    element.helixPosition = `${object.position.x} ${object.position.y} ${object.position.z}`;
    element.helixRotation = `${degree.x} ${degree.y} ${degree.z}`;

    element.gridPosition = `${index % 5 * 400 - 800} ${800 - Math.floor(index / 5) % 5 * 400} ${Math.floor(index / 25) * 1000 - 2000}`;
  };
};
