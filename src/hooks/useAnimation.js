import { useEffect } from "react";
import { movementOfCircles } from "@/utils/threeJS/memoryCircles";
import { movementOfCar } from "@/utils/threeJS/networkCars";
import { movementOfCylinders } from "@/utils/threeJS/diskCylinders";

const useAnimation = (
  cameraRef,
  networkReceiveCarsRef,
  networkTransmitCarsRef,
  diskReadCylindersRef,
  diskWriteCylindersRef,
  memoryUsageCirclesRef,
  rendererRef,
  sceneRef,
) => {
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;
      const radius = 10;

      cameraRef.current.position.x = Math.sin(time) * radius;
      cameraRef.current.position.z = Math.cos(time) * radius;
      cameraRef.current.lookAt(0, 2.5, 0);

      networkReceiveCarsRef.current.forEach((car) => {
        movementOfCar(car, 8.5, true);
      });

      networkTransmitCarsRef.current.forEach((car) => {
        movementOfCar(car, 8.75, false);
      });

      movementOfCylinders(diskReadCylindersRef.current);
      movementOfCylinders(diskWriteCylindersRef.current);
      movementOfCircles(memoryUsageCirclesRef.current);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();
  }, []);
};

export default useAnimation;
