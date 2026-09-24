const room = document.querySelector('.room-section');

if (room) {
  const stage = room.querySelector('.room-stage');
  let started = false;

  async function start() {
    if (started) return;
    started = true;
    try {
      const THREE = await import('./vendor/three.module.js');
      createRoom(THREE, room, stage);
    } catch (error) {
      // The illustrated fallback and the HTML controls remain usable without WebGL.
      console.warn('The café scene could not start.', error);
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      start();
    }, { rootMargin: '300px' });
    observer.observe(stage);
  } else start();
}

function createRoom(THREE, room, stage) {
  const canvas = stage.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#edce75');
  const camera = new THREE.PerspectiveCamera(31, 1, .1, 50);
  camera.position.set(.1, 3.05, 12.2);
  camera.lookAt(0, 2.55, -.65);
  scene.add(new THREE.AmbientLight('#fff1ce', 1.25));
  const daylight = new THREE.DirectionalLight('#fff5db', 1.2);
  daylight.position.set(-3, 7, 7);
  scene.add(daylight);

  const wall = new THREE.MeshStandardMaterial({ color: '#e8c55f', roughness: .9 });
  const shelfMaterial = new THREE.MeshStandardMaterial({ color: '#ffe9a5', roughness: .7 });
  const wood = new THREE.MeshStandardMaterial({ color: '#6e4430', roughness: .7 });
  const woodEdge = new THREE.MeshStandardMaterial({ color: '#3e2b24', roughness: .65 });
  const metal = new THREE.MeshStandardMaterial({ color: '#b89c6f', metalness: .55, roughness: .38 });
  const dark = new THREE.MeshStandardMaterial({ color: '#292826', roughness: .65 });

  function box(parent, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  function cylinder(parent, radius, height, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 24), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  box(scene, 10.5, 6.8, .2, wall, 0, 2.75, -1.55);
  box(scene, 12, .12, 5.3, new THREE.MeshStandardMaterial({ color: '#c8aa7e', roughness: .95 }), 0, -.65, 1.2);
  [-4.5, 4.5].forEach(x => box(scene, .12, 6.8, .2, shelfMaterial, x, 2.75, -1.34));

  const shelfLevels = [4.1, 2.85, 1.6];
  shelfLevels.forEach(y => {
    box(scene, 6.8, .09, .47, shelfMaterial, 0, y, -1.02);
    box(scene, 6.8, .025, .5, metal, 0, y - .065, -1.02);
  });

  const coverPalettes = [
    ['#a54e3b', '#e7b56d', '#f7e1ab'],
    ['#5b352e', '#e0b289', '#f3e8cf'],
    ['#b22f2d', '#efcf70', '#fcf0bd'],
    ['#453a38', '#c88972', '#f2d3a4'],
    ['#f0d376', '#a04c39', '#56372f'],
    ['#93565e', '#e8bf82', '#f9e9c4'],
    ['#c1744b', '#683b30', '#f1cb72'],
    ['#3d3b44', '#be835e', '#f0d48e'],
    ['#e4aa64', '#7f2828', '#f9e5ab']
  ];
  const recordNames = { fr: ['MATIN', 'SOLEIL', 'SOIR'], en: ['MORNING', 'SUNSHINE', 'EVENING'] };
  const recordKeys = ['matin', 'soleil', 'soir'];
  const recordGroups = [];
  const covers = [];
  const interactive = [];

  function coverTitle(row, index) {
    const english = document.documentElement.lang === 'en';
    if (row === 1) return recordNames[english ? 'en' : 'fr'][index];
    return (english ? ['JOY', 'LOVE', 'COFFEE', 'NICE'] : ['PLAISIR', 'AMOUR', 'CAFÉ', 'NICE'])[index];
  }

  function coverTexture(index, title) {
    const surface = document.createElement('canvas');
    surface.width = surface.height = 256;
    const ctx = surface.getContext('2d');
    const [ground, accent, type] = coverPalettes[index % coverPalettes.length];
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(index % 2 ? 81 : 174, 108, 65, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ground;
    ctx.beginPath();
    ctx.arc(index % 2 ? 81 : 174, 108, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = type;
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText('JOSEPHINE  ·  NICE', 18, 28);
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText(title, 18, 222);
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    return texture;
  }

  shelfLevels.forEach((level, row) => {
    const count = row === 1 ? 3 : 4;
    for (let index = 0; index < count; index++) {
      const group = new THREE.Group();
      const x = (index - (count - 1) / 2) * (row === 1 ? 1.43 : 1.36);
      group.position.set(x, level + .57, -.88);
      group.rotation.y = (index % 2 ? -.06 : .045);
      box(group, 1.01, 1.01, .045, woodEdge, 0, 0, 0);
      const coverMaterial = new THREE.MeshStandardMaterial({ map: coverTexture(row * 4 + index, coverTitle(row, index)), roughness: .85 });
      const artwork = new THREE.Mesh(new THREE.PlaneGeometry(.97, .97), coverMaterial);
      artwork.position.z = .029;
      group.add(artwork);
      covers.push({ material: coverMaterial, row, index });
      scene.add(group);
      if (row === 1) {
        group.userData = { action: 'record', key: recordKeys[index] };
        recordGroups.push(group);
        interactive.push(group);
      }
    }
  });

  // A wood cabinet and a simple old-fashioned radio echo the reference photos.
  box(scene, 3.55, .92, 1.05, wood, 0, -.08, .27);
  box(scene, 3.68, .09, 1.15, woodEdge, 0, .44, .27);
  [-1.47, 1.47].forEach(x => box(scene, .11, .31, .89, woodEdge, x, -.69, .27));
  const radio = new THREE.Group();
  radio.userData = { action: 'radio' };
  radio.position.set(0, 1.0, .47);
  box(radio, 2.42, .88, .62, woodEdge, 0, 0, 0);
  box(radio, 2.17, .66, .012, dark, 0, 0, .319);
  box(radio, 1.43, .21, .018, metal, 0, .18, .334);
  const grille = new THREE.MeshStandardMaterial({ color: '#a4865b', metalness: .25, roughness: .65 });
  for (let line = 0; line < 7; line++) box(radio, 1.34, .015, .014, grille, 0, .09 - line * .055, .342);
  const dialMaterial = new THREE.MeshStandardMaterial({ color: '#ba9662', metalness: .55, roughness: .4, emissive: '#f3ab56', emissiveIntensity: 0 });
  [-.87, .87].forEach(x => {
    const knob = cylinder(radio, .115, .06, dialMaterial, x, -.14, .36);
    knob.rotation.x = Math.PI / 2;
  });
  const indicatorMaterial = new THREE.MeshStandardMaterial({ color: '#613a2b', emissive: '#f8c36b', emissiveIntensity: 0 });
  box(radio, .12, .045, .02, indicatorMaterial, 0, -.25, .345);
  scene.add(radio);
  interactive.push(radio);

  const lamps = [];
  const shadeProfile = [
    [0, -.44], [.22, -.44], [.4, -.32], [.5, -.14], [.53, .02],
    [.48, .15], [.31, .24], [.27, .3], [.44, .39], [.46, .49], [.32, .57], [0, .59]
  ].map(([radius, y]) => new THREE.Vector2(radius, y));
  [-2.65, 2.65].forEach((x, index) => {
    const lamp = new THREE.Group();
    lamp.userData = { action: 'lights' };
    lamp.position.set(x, 5.23 - index * .15, .1);
    const shadeMaterial = new THREE.MeshStandardMaterial({ color: '#e8a676', roughness: .42, metalness: .02, emissive: '#f4aa6a', emissiveIntensity: .2, side: THREE.DoubleSide });
    const shade = new THREE.Mesh(new THREE.LatheGeometry(shadeProfile, 40), shadeMaterial);
    lamp.add(shade);
    const bulbMaterial = new THREE.MeshStandardMaterial({ color: '#ffe4ae', emissive: '#ffd48c', emissiveIntensity: .45 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.25, 20, 14), bulbMaterial);
    bulb.position.y = -.31;
    lamp.add(bulb);
    const glow = new THREE.PointLight('#ffd19c', 8, 5.5, 2);
    glow.position.y = -.38;
    lamp.add(glow);
    const cord = cylinder(lamp, .008, 1.2, woodEdge, 0, 1.16, 0);
    cord.position.y = 1.16;
    scene.add(lamp);
    interactive.push(lamp);
    lamps.push({ shadeMaterial, bulbMaterial, glow });
  });

  function render() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  function updateFromControls() {
    const lightsOn = room.dataset.lights === 'on';
    const radioOn = room.dataset.radio === 'on';
    lamps.forEach(({ shadeMaterial, bulbMaterial, glow }) => {
      shadeMaterial.emissiveIntensity = lightsOn ? .2 : .02;
      bulbMaterial.emissiveIntensity = lightsOn ? .45 : .03;
      glow.intensity = lightsOn ? 8 : 0;
    });
    dialMaterial.emissiveIntensity = radioOn ? .65 : 0;
    indicatorMaterial.emissiveIntensity = radioOn ? 1.8 : 0;
    recordGroups.forEach(group => {
      const selected = group.userData.key === room.dataset.record;
      group.position.z = selected ? -.72 : -.88;
      group.rotation.y = selected ? -.11 : .045;
    });
    render();
  }

  function updateCoverLanguage() {
    covers.forEach(({ material, row, index }) => {
      material.map.dispose();
      material.map = coverTexture(row * 4 + index, coverTitle(row, index));
      material.needsUpdate = true;
    });
    render();
  }

  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  function targetAt(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactive, true)[0];
    let object = hit?.object;
    while (object && !object.userData.action) object = object.parent;
    return object?.userData;
  }
  canvas.addEventListener('pointermove', event => { canvas.style.cursor = targetAt(event) ? 'pointer' : 'default'; });
  canvas.addEventListener('click', event => {
    const target = targetAt(event);
    if (target?.action === 'record') room.querySelector(`[data-record-choice="${target.key}"]`).click();
    if (target?.action === 'radio') room.querySelector('[data-toggle-radio]').click();
    if (target?.action === 'lights') room.querySelector('[data-toggle-lights]').click();
  });
  window.addEventListener('josephine:roomchange', updateFromControls);
  window.addEventListener('josephine:languagechange', updateCoverLanguage);
  new ResizeObserver(render).observe(stage);
  updateFromControls();
  stage.classList.add('is-3d');
}
