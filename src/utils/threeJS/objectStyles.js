import * as THREE from "three";

export const objectColors = {
  backgroundColor: 0x293137,
  networkTransmitCarColor: 0xff73a2,
  networkReceiveCarColor: 0x48e3ff,
  diskReadCylinderColor: 0x5bff80,
  diskWriteCylinderColor: 0xffd873,
};

const setPositionAndSize = (
  positionX,
  positionY,
  positionZ,
  sizeX = 1,
  sizeY = 1,
  sizeZ = 1,
) => {
  const position = new THREE.Vector3(positionX, positionY, positionZ);
  const size = new THREE.Vector3(sizeX, sizeY, sizeZ);

  return { position: position, size: size };
};

export const objectPositionsAndSizes = {
  cpuUsageTotalBuilding: setPositionAndSize(0, 1.5, 0, 1.5, 3, 1.5),
  cpuUsageUserBuilding: setPositionAndSize(-1.5, 1.5, 0, 0.75, 3, 1.5),
  cpuUsageSystemBuilding: setPositionAndSize(-2.5, 1.5, 0, 0.75, 3, 1.5),
  diskReadCylinder: setPositionAndSize(3, 1, -1.5),
  diskWriteCylinder: setPositionAndSize(3, 1, 0),
};
