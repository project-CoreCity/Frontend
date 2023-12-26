import * as THREE from "three";

const createCar = (scene, offset, color = 0xffffff) => {
  const geometry = new THREE.BoxGeometry(0.125, 0.125, 0.125);
  const metarial = new THREE.MeshStandardMaterial({ color: color });
  const car = new THREE.Mesh(geometry, metarial);

  car.castShadow = true;
  car.receiveShadow = true;
  car.position.set(0.125 + offset, 0.25, 0.125);
  car.userData.offset = offset;

  scene.add(car);

  return car;
};

export const determineNumberOfCars = (data) => {
  if (!data) return 0;

  const [networkReceivedRate, networkTransmitRate] = data.map((rate) =>
    parseFloat(rate),
  );
  const numberOfTransmitCars = Math.floor(networkTransmitRate / 5);
  const numberOfReceivedCars = Math.floor(networkReceivedRate / 5);

  return { transmit: numberOfTransmitCars, receive: numberOfReceivedCars };
};

export const adjustCarQuantity = (scene, numberOfCars, carsRef, color) => {
  const currentNumberOfCars = carsRef.current.length;

  if (numberOfCars > currentNumberOfCars) {
    for (let i = currentNumberOfCars; i < numberOfCars; i++) {
      const offset = i * 0.1;
      const newCar = createCar(scene, offset, color);

      carsRef.current.push(newCar);
    }
  }

  if (numberOfCars < currentNumberOfCars) {
    for (let i = currentNumberOfCars - 1; i >= numberOfCars; i--) {
      const carToRemove = carsRef.current[i];

      scene.remove(carToRemove);

      carsRef.current.pop();
    }
  }
};

export const movementOfCar = (car, gridSize, isTransmit) => {
  const offset = car.userData.offset || 0;
  const elapsedTime = Date.now() - offset * 1000;
  const edgeLength = gridSize * 4;
  const speed = 0.005;
  const distance = (elapsedTime * speed) % edgeLength;

  if (isTransmit) {
    if (distance <= gridSize) {
      car.position.set(distance - gridSize / 2, 0.125, -gridSize / 2);

      return;
    }

    if (distance <= gridSize * 2) {
      car.position.set(
        gridSize / 2,
        0.125,
        -gridSize / 2 + (distance - gridSize),
      );

      return;
    }

    if (distance <= gridSize * 3) {
      car.position.set(
        gridSize / 2 - (distance - gridSize * 2),
        0.125,
        gridSize / 2,
      );

      return;
    }

    car.position.set(
      -gridSize / 2,
      0.125,
      gridSize / 2 - (distance - gridSize * 3),
    );
  }

  if (!isTransmit) {
    if (distance <= gridSize) {
      car.position.set(gridSize / 2, 0.125, -distance + gridSize / 2);

      return;
    }

    if (distance <= gridSize * 2) {
      car.position.set(
        gridSize / 2 - (distance - gridSize),
        0.125,
        -gridSize / 2,
      );

      return;
    }

    if (distance <= gridSize * 3) {
      car.position.set(
        -gridSize / 2,
        0.125,
        -gridSize / 2 + (distance - gridSize * 2),
      );

      return;
    }

    car.position.set(
      -gridSize / 2 + (distance - gridSize * 3),
      0.125,
      gridSize / 2,
    );
  }
};
