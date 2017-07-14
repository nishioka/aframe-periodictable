// A-Frame
const AFRAME = window.AFRAME;
const THREE = AFRAME.THREE;
const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';

// var zeroScale = 0.00001;

AFRAME.registerComponent('element', {
  // To enable multiple instancing on your component,
  // set multiple: true in the component definition:
  multiple: false,

  schema: {
    symbol: {default: ''},
    details: {default: ''},
    mol: {default: 0},
    x: {default: 0},
    y: {default: 0}
  },

  // Called once when the component is initialized.
  // Used to set up initial state and instantiate variables.
  init () {
    const entity = this.data;
    // const el = this.el;
    // const material = el.components.material;
    // console.log('entity:', entity);
    // this.GRABBED_STATE = 'grabbed';
    // Bind event handlers
    // this.onHit = this.onHit.bind(this);
    // this.onGripOpen = this.onGripOpen.bind(this);
    // this.onGripClose = this.onGripClose.bind(this);

    const size = {
      canvas: {
        width: 480,
        height: 640
      },
      texture: {
        width: 120,
        height: 160
      }
    };

    let canvas = document.createElement('canvas');
    canvas.width = size.canvas.width;
    canvas.height = size.canvas.height;

    let context = canvas.getContext('2d');
    let geometry = new THREE.PlaneBufferGeometry(size.texture.width, size.texture.height);
    // geometry.mergeVertices();

    // SVGの作成
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'version', '1.1');
    svg.setAttribute('xmlns', SVG_NS);
    svg.setAttribute('width', canvas.width);
    svg.setAttribute('height', canvas.height);

    // DOMをforeignObjectでSVGに描画
    let object = document.createElementNS(SVG_NS, 'foreignObject');
    object.setAttribute('width', '100%');
    object.setAttribute('height', '100%');
    svg.appendChild(object);

    // DOMオブジェクトの作成
    let html = document.createElementNS(XHTML_NS, 'div');
    html.setAttribute('xmlns', XHTML_NS);
    object.appendChild(html);

    let element = document.createElementNS(XHTML_NS, 'div');
    element.style.backgroundColor = `rgba(0,127,127,${Math.random() * 0.5 + 0.25})`;
    element.style.width = `${canvas.width}px`;
    element.style.height = `${canvas.height}px`;
    element.style.boxShadow = '0px 0px 12px rgba(0, 255, 255, 0.5)';
    element.style.border = '1px solid rgba(127, 255, 255, 0.25)';
    element.style.textAlign = 'center';
    html.appendChild(element);

    let number = document.createElementNS(XHTML_NS, 'div');
    number.style.position = 'absolute';
    number.style.top = '10%';
    number.style.right = '10%';
    number.style.fontSize = `${canvas.width / 6}px`;
    number.style.color = 'rgba(127, 255, 255, 0.75)';
    number.textContent = entity.number;
    element.appendChild(number);

    let symbol = document.createElementNS(XHTML_NS, 'div');
    symbol.style.position = 'absolute';
    symbol.style.top = '20%';
    symbol.style.left = '0px';
    symbol.style.right = '0px';
    symbol.style.fontSize = `${canvas.width / 2}px`;
    symbol.style.fontWeight = 'bold';
    symbol.style.color = 'rgba(255, 255, 255, 0.75)';
    symbol.style.textShadow = '0px 0px 10px rgba(0, 255, 255, 0.95)';
    symbol.textContent = entity.symbol;
    element.appendChild(symbol);

    let details = document.createElementNS(XHTML_NS, 'div');
    details.style.position = 'absolute';
    details.style.top = '65%';
    details.style.left = '0px';
    details.style.right = '0px';
    details.style.fontSize = `${canvas.width / 6}px`;
    details.style.color = 'rgba(127, 255, 255, 0.75)';
    details.textContent = entity.details;
    element.appendChild(details);

    let mol = document.createElementNS(XHTML_NS, 'div');
    mol.style.position = 'absolute';
    mol.style.top = '80%';
    mol.style.left = '0px';
    mol.style.right = '0px';
    mol.style.fontSize = `${canvas.width / 6}px`;
    mol.style.color = 'rgba(127, 255, 255, 0.75)';
    mol.textContent = entity.mol;
    element.appendChild(mol);

    // SVGをCanvasに描画する
    const url = `data:image/svg+xml;charset=utf-8,${svg.outerHTML}`;
    const image = new Image();

    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // 生成したCanvasをtextureとしてTHREE.Textureオブジェクトを生成
      const texture = new THREE.Texture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        map: texture
      });

      // 初期位置はランダムで配置
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 4000 - 2000;
      mesh.position.y = Math.random() * 4000 - 2000;
      mesh.position.z = Math.random() * 4000 - 2000;

      // オブジェクト破棄
      const DOMURL = self.URL || self.webkitURL || self;
      DOMURL.revokeObjectURL(url);

      this.el.setObject3D('mesh', mesh);
    });
    // image.addEventListener('error', err => {
    // rejector(err);
    // });
    image.src = url;
  },

  // Called both when the component is initialized and whenever the componentâ€™s
  // data changes (e.g, via setAttribute). Used to modify the entity.
  update () {
    // var data = this.data;
    // var object3D = this.el.object3D;
    // var x = data.x === 0 ? zeroScale : data.x;
    // var y = data.y === 0 ? zeroScale : data.y;
    // var z = data.z === 0 ? zeroScale : data.z;
    // object3D.scale.set(x, y, z);
  },

  // Called when the component detaches from the element (e.g.,
  // via removeAttribute). Used to undo all previous modifications to the entity.
  remove () {
    this.el.removeObject3D('mesh');
  },

  // Called on each render loop or tick of the scene. Used for continuous changes.
  tick () {},

  // Called whenever the scene or entity plays to add
  // any background or dynamic behavior. Used to start or resume behavior.
  play () {},

  // Called whenever the scene or entity pauses to remove any
  // background or dynamic behavior. Used to pause behavior.
  pause () {},

  // Called on every update. Can be used to dynamically modify the schema.
  updateSchema () {}
  /**
   * Use play() instead of init(), because component mappings – unavailable as dependencies – are
   * not guaranteed to have parsed when this component is initialized.
   */
  // play: function () {
  //   var el = this.el,
  //       data = this.data,
  //       material = el.components.material;
  //
  //   var geometry = new THREE.PlaneGeometry(data.width, data.depth, data.density, data.density);
  //   geometry.mergeVertices();
  //   this.waves = [];
  //   for (var v, i = 0, l = geometry.vertices.length; i < l; i++) {
  //     v = geometry.vertices[i];
  //     this.waves.push({
  //       z: v.z,
  //       ang: Math.random() * Math.PI * 2,
  //       amp: data.amplitude + Math.random() * data.amplitudeVariance,
  //       speed: (data.speed + Math.random() * data.speedVariance) / 1000 // radians / frame
  //     });
  //   }
  //
  //   if (!material) {
  //     material = {};
  //     material.material = new THREE.MeshPhongMaterial({
  //       color: data.color,
  //       transparent: data.opacity < 1,
  //       opacity: data.opacity,
  //       shading: THREE.FlatShading,
  //     });
  //   }
  //
  //   this.mesh = new THREE.Mesh(geometry, material.material);
  //   el.setObject3D('mesh', this.mesh);
  // },
});
