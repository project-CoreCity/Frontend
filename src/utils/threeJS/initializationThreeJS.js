import * as THREE from "three";

const dummyBuildings = [
  {
    position: new THREE.Vector3(3.5, 0.5, 3.5),
    size: new THREE.Vector3(1, 0.5, 1),
  },
  {
    position: new THREE.Vector3(2.5, 1, 3.5),
    size: new THREE.Vector3(1, 1, 1),
  },
  {
    position: new THREE.Vector3(1, 4, 3.5),
    size: new THREE.Vector3(1, 4, 1),
  },
  {
    position: new THREE.Vector3(3, 3, 2),
    size: new THREE.Vector3(1, 3, 1),
  },
  {
    position: new THREE.Vector3(2, 3, 2),
    size: new THREE.Vector3(0.5, 3, 0.5),
  },
  {
    position: new THREE.Vector3(1.4, 5, 2),
    size: new THREE.Vector3(0.5, 5, 0.5),
  },
  {
    position: new THREE.Vector3(1.5, 3.5, 1.5),
    size: new THREE.Vector3(1.5, 3.5, 0.5),
  },
  {
    position: new THREE.Vector3(-0.75, 1.5, 3),
    size: new THREE.Vector3(2, 1.5, 0.5),
  },
  {
    position: new THREE.Vector3(-0.75, 1, 3.6),
    size: new THREE.Vector3(2, 1, 0.5),
  },
  {
    position: new THREE.Vector3(-2.5, 3, -2.5),
    size: new THREE.Vector3(2, 3, 2),
  },
  {
    position: new THREE.Vector3(1, 4, -2),
    size: new THREE.Vector3(1.3, 4, 1.3),
  },
  {
    position: new THREE.Vector3(3, 1, -0.75),
    size: new THREE.Vector3(1.5, 1, 3),
  },
  {
    position: new THREE.Vector3(-3, 2, 2.75),
    size: new THREE.Vector3(1, 2, 2),
  },
  {
    position: new THREE.Vector3(1.5, 2, -3.5),
    size: new THREE.Vector3(3.5, 2, 0.5),
  },
];

const createDummyBuilding = (scene, position, size, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const material = new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity: 0.5,
  });
  const dummyBuilding = new THREE.Mesh(geometry, material);

  dummyBuilding.castShadow = true;
  dummyBuilding.receiveShadow = true;
  dummyBuilding.position.set(position.x, position.y / 2, position.z);

  scene.add(dummyBuilding);

  return dummyBuilding;
};

export const initializeScene = (color) => {
  const scene = new THREE.Scene(color);

  scene.background = new THREE.Color(color);

  return scene;
};

export const initializeCamera = () => {
  const camera = new THREE.PerspectiveCamera(71, 1, 1, 1000);

  camera.position.set(0, 10, 0);

  return camera;
};

export const initializeRenderer = (ref) => {
  const renderer = new THREE.WebGLRenderer();
  const size = ref.current.clientWidth;

  renderer.setSize(size, size);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  ref.current.appendChild(renderer.domElement);

  return renderer;
};

export const addLightsToScene = (scene) => {
  const ambientLight = new THREE.AmbientLight(0x1017ff, 2.5);
  const sunLight = new THREE.DirectionalLight(0xffffff, 2);
  const cyanLight = new THREE.PointLight(0x00f0ff, 300, 20);
  const coralLight = new THREE.PointLight(0xff6915, 300, 30);

  sunLight.position.set(5, 10, 10);
  sunLight.castShadow = true;
  cyanLight.position.set(8, 2, -8);
  coralLight.position.set(-8, 2, 8);

  scene.add(ambientLight);
  scene.add(sunLight);
  scene.add(cyanLight);
  scene.add(coralLight);

  return sunLight;
};

export const createGround = (scene, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(9, 1, 9);
  const metarial = new THREE.MeshStandardMaterial({ color: color });
  const ground = new THREE.Mesh(geometry, metarial);

  ground.position.set(0, -0.5, 0);
  ground.receiveShadow = true;

  scene.add(ground);
};

export const createDummyBuildings = (scene) => {
  dummyBuildings.forEach((dummyBuilding) => {
    createDummyBuilding(scene, dummyBuilding.position, dummyBuilding.size);
  });
};
