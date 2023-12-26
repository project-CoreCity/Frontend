import * as THREE from "three";

export const createBuilding = (scene, position, size, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const metarial = new THREE.MeshStandardMaterial({
    color: color,
  });
  const building = new THREE.Mesh(geometry, metarial);

  building.castShadow = true;
  building.receiveShadow = true;
  building.position.set(position.x, position.y, position.z);

  scene.add(building);

  return building;
};

export const adjustBuildingHeight = (buildingRef, data) => {
  const height = (parseFloat(data) / 100) * 20;

  buildingRef.current.scale.y = height / 2;
  buildingRef.current.position.y = (height / 2) * 1.5;
};
