import * as THREE from "three";

const createCylinder = (scene, offset = 0, position, color = 0xffffff) => {
  const radius = 0.5;
  const height = 0.1;
  const radialSegments = 32;
  const heightSegments = 1;
  const thetaStart = 0;
  const thetaLength = Math.PI * 2;
  const spacing = 0.5;
  const additionalHeight = position.y;
  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    radialSegments,
    heightSegments,
    false,
    thetaStart,
    thetaLength,
  );
  const material = new THREE.MeshStandardMaterial({
    color: color,
    transparent: true,
    opacity: 1,
  });
  const cylinder = new THREE.Mesh(geometry, material);

  cylinder.userData.originalY = additionalHeight + height + offset * spacing;
  cylinder.castShadow = true;
  cylinder.receiveShadow = false;
  cylinder.position.set(
    position.x,
    additionalHeight + height + offset * spacing,
    position.z,
  );
  cylinder.userData.offset = offset;

  scene.add(cylinder);

  return cylinder;
};

export const determinateNumberOfCylinders = (data) => {
  if (!data) return 0;

  let numberOfCylinders;

  numberOfCylinders = Math.floor(parseFloat(data) / 50);

  if (numberOfCylinders === 0) {
    numberOfCylinders = 1;

    return numberOfCylinders;
  }

  return numberOfCylinders;
};

export const adjustCylinderQuantity = (
  scene,
  numberOfCylinders,
  cylindersRef,
  position,
  color,
) => {
  const currentNumberOfCylinders = cylindersRef.current.length;

  if (numberOfCylinders === currentNumberOfCylinders) {
    cylindersRef.current.forEach((cylinder) => {
      cylinder.material.transparent = true;
      cylinder.material.opacity = 0.5;
    });
  }

  if (numberOfCylinders !== currentNumberOfCylinders) {
    cylindersRef.current.forEach((cylinder) => {
      cylinder.material.transparent = true;
      cylinder.material.opacity = 1;
    });
  }

  if (numberOfCylinders > currentNumberOfCylinders) {
    for (let i = currentNumberOfCylinders; i < numberOfCylinders; i++) {
      const offset = i;
      const newCylinder = createCylinder(scene, offset, position, color);

      cylindersRef.current.push(newCylinder);
    }
  }

  if (numberOfCylinders < currentNumberOfCylinders) {
    for (let i = currentNumberOfCylinders - 1; i >= numberOfCylinders; i--) {
      const cylinderToRemove = cylindersRef.current[i];

      scene.remove(cylinderToRemove);

      cylindersRef.current.pop();
    }
  }
};

export const movementOfCylinders = (cylinders) => {
  const amplitude = 0.025;
  const timeFactor = 0.001;
  const time = Date.now() * timeFactor;

  cylinders.forEach((cylinder, index) => {
    const initialY = cylinder.userData.originalY;
    const offsetAmplitude = index * amplitude;

    cylinder.position.y =
      initialY + Math.sin(time + cylinder.userData.offset) * offsetAmplitude;
  });
};
