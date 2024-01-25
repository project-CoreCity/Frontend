import { useEffect } from "react";
import { movementOfCircles } from "@/utils/threeJS/memoryCircles";
import { movementOfCar } from "@/utils/threeJS/networkCars";
import { movementOfCylinders } from "@/utils/threeJS/diskCylinders";

const useAnimation = (refs) => {
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.0001;
      const radius = 10;

      refs.cameraRef.current.position.x = Math.sin(time) * radius;
      refs.cameraRef.current.position.z = Math.cos(time) * radius;
      refs.cameraRef.current.lookAt(0, 2.5, 0);

      refs.networkReceiveCarsRef.current.forEach((car) => {
        movementOfCar(car, 8.5, true);
      });

      refs.networkTransmitCarsRef.current.forEach((car) => {
        movementOfCar(car, 8.75, false);
      });

      movementOfCylinders(refs.diskReadCylindersRef.current);
      movementOfCylinders(refs.diskWriteCylindersRef.current);
      movementOfCircles(refs.memoryUsageCirclesRef.current);

      refs.rendererRef.current.render(
        refs.sceneRef.current,
        refs.cameraRef.current,
      );
    };

    animate();
  }, []);
};

export default useAnimation;
