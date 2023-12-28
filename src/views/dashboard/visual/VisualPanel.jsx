import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import useAnimation from "@/hooks/useAnimation";
import { handleResize } from "@/utils/threeJS/handlers";
import {
  initializeScene,
  initializeCamera,
  initializeRenderer,
  addLightsToScene,
  createGround,
  createDummyBuildings,
} from "@/utils/threeJS/initializationThreeJS";
import {
  objectPositionsAndSizes,
  objectColors,
} from "@/utils/threeJS/objectStyles";
import {
  createBuilding,
  adjustBuildingHeight,
} from "@/utils/threeJS/cpuBuildings";
import {
  determinateNumberOfCircles,
  adjustCircleQuantity,
} from "@/utils/threeJS/memoryCircles";
import {
  determineNumberOfCars,
  adjustCarQuantity,
} from "@/utils/threeJS/networkCars";
import {
  determinateNumberOfCylinders,
  adjustCylinderQuantity,
} from "@/utils/threeJS/diskCylinders";

function VisualPanel({ data }) {
  const sceneRef = useRef(null);
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cpuUsageTotalBuildingRef = useRef(null);
  const cpuUsageUserBuildingRef = useRef(null);
  const cpuUsageSystemBuildingRef = useRef(null);
  const memoryUsageCirclesRef = useRef([]);
  const networkReceiveCarsRef = useRef([]);
  const networkTransmitCarsRef = useRef([]);
  const diskReadCylindersRef = useRef([]);
  const diskWriteCylindersRef = useRef([]);

  useEffect(() => {
    const scene = initializeScene(objectColors.backgroundColor);
    const camera = initializeCamera();

    rendererRef.current = initializeRenderer(mountRef);

    const cpuUsageTotalBuilding = createBuilding(
      scene,
      objectPositionsAndSizes.cpuUsageTotalBuilding.position,
      objectPositionsAndSizes.cpuUsageTotalBuilding.size,
    );
    const cpuUsageUserBuilding = createBuilding(
      scene,
      objectPositionsAndSizes.cpuUsageUserBuilding.position,
      objectPositionsAndSizes.cpuUsageUserBuilding.size,
    );
    const cpuUsageSystemBuilding = createBuilding(
      scene,
      objectPositionsAndSizes.cpuUsageSystemBuilding.position,
      objectPositionsAndSizes.cpuUsageSystemBuilding.size,
    );

    sceneRef.current = scene;
    cameraRef.current = camera;
    cpuUsageTotalBuildingRef.current = cpuUsageTotalBuilding;
    cpuUsageUserBuildingRef.current = cpuUsageUserBuilding;
    cpuUsageSystemBuildingRef.current = cpuUsageSystemBuilding;

    addLightsToScene(scene);
    createGround(scene);
    createDummyBuildings(scene);

    window.addEventListener(
      "resize",
      () => handleResize(rendererRef, mountRef, cameraRef.current),
      false,
    );

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      window.removeEventListener(
        "resize",
        () => handleResize(rendererRef, mountRef, cameraRef.current),
        false,
      );
    };
  }, []);

  useEffect(() => {
    if (data) {
      const numberOfMemoryUsageCircles = determinateNumberOfCircles(
        data.memoryMetrics.mainDisplay,
      );
      const numberOfCars = determineNumberOfCars(
        data.networkMetrics.mainDisplay,
      );
      const numberOfDiskReadCylinders = determinateNumberOfCylinders(
        data.diskMetrics.mainDisplay[0],
      );
      const numberOfdiskWriteCylinders = determinateNumberOfCylinders(
        data.diskMetrics.mainDisplay[1],
      );

      adjustBuildingHeight(
        cpuUsageTotalBuildingRef,
        data.cpuMetrics.mainDisplay,
      );
      adjustBuildingHeight(
        cpuUsageUserBuildingRef,
        data.cpuMetrics.cpuUsageUser,
      );
      adjustBuildingHeight(
        cpuUsageSystemBuildingRef,
        data.cpuMetrics.cpuUsageSystem,
      );

      adjustCircleQuantity(
        sceneRef.current,
        numberOfMemoryUsageCircles,
        memoryUsageCirclesRef,
      );

      adjustCarQuantity(
        sceneRef.current,
        numberOfCars.transmit,
        networkTransmitCarsRef,
        objectColors.networkTransmitCarColor,
      );
      adjustCarQuantity(
        sceneRef.current,
        numberOfCars.receive,
        networkReceiveCarsRef,
        objectColors.networkReceiveCarColor,
      );

      adjustCylinderQuantity(
        sceneRef.current,
        numberOfDiskReadCylinders,
        diskReadCylindersRef,
        objectPositionsAndSizes.diskReadCylinder.position,
        objectColors.diskReadCylinderColor,
      );
      adjustCylinderQuantity(
        sceneRef.current,
        numberOfdiskWriteCylinders,
        diskWriteCylindersRef,
        objectPositionsAndSizes.diskWriteCylinder.position,
        objectColors.diskWriteCylinderColor,
      );
    }
  }, [data]);

  useAnimation(
    cameraRef,
    networkReceiveCarsRef,
    networkTransmitCarsRef,
    diskReadCylindersRef,
    diskWriteCylindersRef,
    memoryUsageCirclesRef,
    rendererRef,
    sceneRef,
  );

  return (
    <div className="flex items-center justify-center">
      <div className="w-5/6" ref={mountRef}></div>
    </div>
  );
}

VisualPanel.propTypes = {
  data: PropTypes.object,
};

export default VisualPanel;
