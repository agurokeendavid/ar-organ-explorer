/* Simplified educational organ models built from three.js primitives.
   Exposes window.OrganModel (live, rotating) and window.OrganThumb (cached still image). */
(function () {
  var THREE_P = null;
  function getTHREE() {
    if (!THREE_P) {
      var url = (window.__resources && window.__resources.three) || 'https://unpkg.com/three@0.160.0/build/three.module.js';
      THREE_P = import(url);
    }
    return THREE_P;
  }

  var PAL = {
    muscle: 0xd9695e, muscleDark: 0xc0554d, artery: 0xcf5a52, vein: 0x7f9ed4,
    lung: 0xe3a3ab, airway: 0xcfd6e0, brain: 0xdfa9b3, brainDark: 0xc98f9c,
    gut: 0xdda172, gutDark: 0xc4854f, stomach: 0xd99a63,
    kidney: 0xa75f57, bladder: 0xe6cf95, bone: 0xece3cf, boneDark: 0xd8ccb0
  };

  function mat(T, color) {
    return new T.MeshStandardMaterial({ color: color, roughness: 0.58, metalness: 0.02 });
  }
  function add(T, group, geo, m, pos, scale, rot) {
    var mesh = new T.Mesh(geo, m);
    if (pos) mesh.position.set(pos[0], pos[1], pos[2]);
    if (scale) mesh.scale.set(scale[0], scale[1], scale[2]);
    if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
    group.add(mesh);
    return mesh;
  }

  function buildHeart(T) {
    var g = new T.Group();
    var m = mat(T, PAL.muscle), md = mat(T, PAL.muscleDark);
    var sph = new T.SphereGeometry(1, 40, 28);
    add(T, g, sph, m, [-0.42, 0.42, 0], [0.66, 0.62, 0.62]);
    add(T, g, sph, m, [0.42, 0.42, 0], [0.66, 0.62, 0.62]);
    add(T, g, sph, m, [0, -0.05, 0], [0.92, 0.72, 0.8]);
    add(T, g, new T.ConeGeometry(0.86, 1.35, 32), m, [0.06, -0.95, 0], null, [Math.PI, 0, 0.12]);
    add(T, g, new T.CylinderGeometry(0.2, 0.24, 1.1, 20), mat(T, PAL.artery), [0.02, 1.18, -0.1], null, [0, 0, -0.12]);
    add(T, g, new T.CylinderGeometry(0.15, 0.17, 0.8, 16), mat(T, PAL.vein), [-0.5, 1.0, 0.1], null, [0, 0, 0.4]);
    add(T, g, new T.CylinderGeometry(0.13, 0.15, 0.7, 16), mat(T, PAL.vein), [0.62, 0.95, 0.15], null, [0, 0, -0.45]);
    add(T, g, new T.TorusGeometry(0.72, 0.09, 12, 40, Math.PI * 1.1), md, [0, 0.1, 0.42], [1, 0.7, 1], [0.2, 0, 0.3]);
    return g;
  }

  function buildLungs(T) {
    var g = new T.Group();
    var m = mat(T, PAL.lung), a = mat(T, PAL.airway);
    var sph = new T.SphereGeometry(1, 36, 26);
    add(T, g, sph, m, [-0.78, -0.05, 0], [0.6, 1.05, 0.52]);
    add(T, g, sph, m, [0.78, -0.05, 0], [0.6, 1.12, 0.52]);
    add(T, g, sph, m, [-0.72, 0.75, 0], [0.44, 0.42, 0.4]);
    add(T, g, sph, m, [0.72, 0.8, 0], [0.44, 0.42, 0.4]);
    add(T, g, new T.CylinderGeometry(0.16, 0.16, 1.1, 18), a, [0, 1.35, 0]);
    add(T, g, new T.CylinderGeometry(0.11, 0.13, 0.9, 14), a, [-0.34, 0.72, 0], null, [0, 0, 0.62]);
    add(T, g, new T.CylinderGeometry(0.11, 0.13, 0.9, 14), a, [0.34, 0.72, 0], null, [0, 0, -0.62]);
    add(T, g, new T.BoxGeometry(1.9, 0.12, 0.5), mat(T, PAL.muscleDark), [0, -1.2, 0], null, [0.06, 0, 0]);
    return g;
  }

  function buildBrain(T) {
    var g = new T.Group();
    var m = mat(T, PAL.brain), d = mat(T, PAL.brainDark);
    var sph = new T.SphereGeometry(1, 32, 22);
    add(T, g, sph, m, [-0.4, 0.22, 0], [0.78, 0.72, 0.98]);
    add(T, g, sph, m, [0.4, 0.22, 0], [0.78, 0.72, 0.98]);
    var bump = new T.SphereGeometry(0.3, 18, 14);
    for (var i = 0; i < 16; i++) {
      var t = i / 16 * Math.PI * 2;
      var side = i % 2 ? 1 : -1;
      add(T, g, bump, m, [side * (0.34 + Math.abs(Math.cos(t)) * 0.42), 0.5 + Math.sin(t) * 0.42, Math.cos(t) * 0.72]);
    }
    add(T, g, sph, d, [0, -0.62, -0.55], [0.56, 0.32, 0.42]);
    add(T, g, new T.CylinderGeometry(0.19, 0.15, 0.85, 16), d, [0, -0.92, -0.18], null, [0.32, 0, 0]);
    return g;
  }

  function buildKidneys(T) {
    var g = new T.Group();
    var m = mat(T, PAL.kidney);
    var bean = new T.CapsuleGeometry(0.4, 0.56, 12, 24);
    add(T, g, bean, m, [-0.78, 0.42, 0], [1, 1, 0.74], [0, 0, 0.16]);
    add(T, g, bean, m, [0.78, 0.42, 0], [1, 1, 0.74], [0, 0, -0.16]);
    add(T, g, new T.SphereGeometry(0.22, 16, 12), mat(T, PAL.muscleDark), [-0.44, 0.42, 0], [0.7, 1, 0.7]);
    add(T, g, new T.SphereGeometry(0.22, 16, 12), mat(T, PAL.muscleDark), [0.44, 0.42, 0], [0.7, 1, 0.7]);
    var ur = mat(T, PAL.airway);
    add(T, g, new T.CylinderGeometry(0.075, 0.075, 1.35, 12), ur, [-0.4, -0.4, 0], null, [0, 0, 0.24]);
    add(T, g, new T.CylinderGeometry(0.075, 0.075, 1.35, 12), ur, [0.4, -0.4, 0], null, [0, 0, -0.24]);
    add(T, g, new T.SphereGeometry(0.44, 26, 18), mat(T, PAL.bladder), [0, -1.28, 0], [1, 0.8, 0.9]);
    return g;
  }

  function buildDigestive(T) {
    var g = new T.Group();
    add(T, g, new T.CylinderGeometry(0.12, 0.12, 1.0, 14), mat(T, PAL.gutDark), [-0.18, 1.62, 0], null, [0, 0, 0.1]);
    add(T, g, new T.SphereGeometry(1, 32, 22), mat(T, PAL.stomach), [-0.42, 0.92, 0], [0.66, 0.5, 0.44], [0, 0, 0.3]);
    var pts = [];
    for (var i = 0; i <= 60; i++) {
      var t = i / 60;
      var turns = t * Math.PI * 5.2;
      var r = 0.72 - t * 0.22;
      pts.push(new T.Vector3(Math.cos(turns) * r, 0.2 - t * 1.05, Math.sin(turns) * r * 0.42));
    }
    var curve = new T.CatmullRomCurve3(pts);
    add(T, g, new T.TubeGeometry(curve, 140, 0.14, 12, false), mat(T, PAL.gut));
    var lp = [
      new T.Vector3(-0.95, -1.15, 0), new T.Vector3(-1.05, 0.1, 0), new T.Vector3(-0.9, 0.62, 0),
      new T.Vector3(0, 0.78, 0), new T.Vector3(0.92, 0.6, 0), new T.Vector3(1.05, 0.05, 0),
      new T.Vector3(0.95, -1.0, 0), new T.Vector3(0.4, -1.35, 0)
    ];
    add(T, g, new T.TubeGeometry(new T.CatmullRomCurve3(lp), 120, 0.2, 12, false), mat(T, PAL.gutDark));
    return g;
  }

  function buildSkeleton(T) {
    var g = new T.Group();
    var m = mat(T, PAL.bone), d = mat(T, PAL.boneDark);
    add(T, g, new T.SphereGeometry(0.52, 28, 20), m, [0, 2.28, 0], [1, 1.1, 0.94]);
    add(T, g, new T.BoxGeometry(0.5, 0.26, 0.44), m, [0, 1.86, 0.12]);
    var vert = new T.CylinderGeometry(0.12, 0.12, 0.16, 12);
    for (var i = 0; i < 11; i++) add(T, g, vert, d, [0, 1.6 - i * 0.24, -0.06]);
    var rib = new T.TorusGeometry(0.62, 0.055, 8, 30, Math.PI * 1.05);
    for (var r = 0; r < 6; r++) {
      add(T, g, rib, m, [0, 1.34 - r * 0.26, 0.02], [1 - r * 0.03, 0.72, 0.86], [Math.PI / 2, 0, Math.PI + 0.02]);
    }
    add(T, g, new T.BoxGeometry(0.34, 0.7, 0.12), m, [0, 1.0, 0.5]);
    add(T, g, new T.TorusGeometry(0.46, 0.13, 10, 26, Math.PI * 1.2), m, [0, -1.08, 0], [1, 0.72, 0.8], [Math.PI / 2, 0, Math.PI]);
    add(T, g, new T.CylinderGeometry(0.11, 0.13, 1.5, 14), m, [-0.3, -1.95, 0]);
    add(T, g, new T.CylinderGeometry(0.11, 0.13, 1.5, 14), m, [0.3, -1.95, 0]);
    add(T, g, new T.CylinderGeometry(0.16, 0.13, 0.7, 14), m, [-0.66, 1.28, 0], null, [0, 0, 0.35]);
    add(T, g, new T.CylinderGeometry(0.16, 0.13, 0.7, 14), m, [0.66, 1.28, 0], null, [0, 0, -0.35]);
    return g;
  }

  var BUILDERS = {
    heart: buildHeart, lungs: buildLungs, brain: buildBrain,
    kidneys: buildKidneys, digestive: buildDigestive, skeleton: buildSkeleton
  };

  function makeGroup(T, organ) {
    var b = BUILDERS[organ] || BUILDERS.heart;
    var g = b(T);
    var box = new T.Box3().setFromObject(g);
    var c = box.getCenter(new T.Vector3());
    var size = box.getSize(new T.Vector3());
    var k = 2.4 / Math.max(size.x, size.y, size.z);
    g.position.set(-c.x * k, -c.y * k, -c.z * k);
    g.scale.setScalar(k);
    var wrap = new T.Group();
    wrap.add(g);
    return wrap;
  }

  function light(T, scene) {
    scene.add(new T.HemisphereLight(0xffffff, 0xb9c0cc, 1.05));
    var key = new T.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.6, 3.4, 3.2);
    scene.add(key);
    var rim = new T.DirectionalLight(0xdbe4f5, 0.7);
    rim.position.set(-3, 1.4, -2.4);
    scene.add(rim);
  }

  /* ---- shared offscreen renderer for still thumbnails ---- */
  var offRenderer = null, thumbCache = {};
  function thumbUrl(T, organ) {
    if (thumbCache[organ]) return thumbCache[organ];
    if (!offRenderer) {
      offRenderer = new T.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      offRenderer.setSize(320, 320);
      offRenderer.setPixelRatio(2);
    }
    var scene = new T.Scene();
    light(T, scene);
    scene.add(makeGroup(T, organ));
    scene.rotation.y = -0.42;
    scene.rotation.x = 0.12;
    var cam = new T.PerspectiveCamera(34, 1, 0.1, 40);
    cam.position.set(0, 0, 5.4);
    cam.lookAt(0, 0, 0);
    offRenderer.render(scene, cam);
    thumbCache[organ] = offRenderer.domElement.toDataURL('image/png');
    return thumbCache[organ];
  }

  function mountLive(T, host, organ, spin) {
    var w = host.clientWidth || 260, h = host.clientHeight || 260;
    var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);
    var scene = new T.Scene();
    light(T, scene);
    var group = makeGroup(T, organ);
    scene.add(group);
    var cam = new T.PerspectiveCamera(34, w / h, 0.1, 40);
    function fit() {
      var half = Math.tan(34 * Math.PI / 360);
      var r = 1.32;
      cam.position.z = Math.max(r / half, r / (half * cam.aspect)) * 1.1;
    }
    fit();
    var raf = 0, t0 = performance.now(), stopped = false;
    function frame(now) {
      if (stopped) return;
      var e = (now - t0) / 1000;
      group.rotation.y = spin ? e * 0.42 : -0.42;
      group.rotation.x = 0.1 + (spin ? Math.sin(e * 0.5) * 0.06 : 0.02);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    var ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(function () {
        var nw = host.clientWidth, nh = host.clientHeight;
        if (!nw || !nh) return;
        renderer.setSize(nw, nh);
        cam.aspect = nw / nh;
        fit();
        cam.updateProjectionMatrix();
      });
      ro.observe(host);
    }
    return function () {
      stopped = true;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }

  var R = window.React;

  window.OrganModel = function OrganModel(props) {
    var ref = R.useRef(null);
    var organ = props.organ || 'heart';
    var spin = props.spin !== false && props.spin !== 'false';
    R.useEffect(function () {
      var dead = false, dispose = null;
      getTHREE().then(function (T) {
        if (dead || !ref.current) return;
        dispose = mountLive(T, ref.current, organ, spin);
      });
      return function () { dead = true; if (dispose) dispose(); };
    }, [organ, spin]);
    return R.createElement('div', { ref: ref, style: { width: '100%', height: '100%' } });
  };

  window.OrganThumb = function OrganThumb(props) {
    var organ = props.organ || 'heart';
    var st = R.useState(null), url = st[0], setUrl = st[1];
    R.useEffect(function () {
      var dead = false;
      getTHREE().then(function (T) { if (!dead) setUrl(thumbUrl(T, organ)); });
      return function () { dead = true; };
    }, [organ]);
    return R.createElement('div', {
      style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    }, url ? R.createElement('img', {
      src: url, alt: organ,
      style: { width: '100%', height: '100%', objectFit: 'contain' }
    }) : null);
  };
})();
