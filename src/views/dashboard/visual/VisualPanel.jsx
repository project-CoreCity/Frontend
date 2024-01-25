import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
import { createBuilding } from "@/utils/threeJS/cpuBuildings";
import useVisualUpdates from "@/hooks/useVisualUpdates";

function VisualPanel({ data }) {
  const location = useLocation();
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

  const refs = {
    sceneRef: sceneRef,
    mountRef: mountRef,
    rendererRef: rendererRef,
    cameraRef: cameraRef,
    cpuUsageTotalBuildingRef: cpuUsageTotalBuildingRef,
    cpuUsageUserBuildingRef: cpuUsageUserBuildingRef,
    cpuUsageSystemBuildingRef: cpuUsageSystemBuildingRef,
    memoryUsageCirclesRef: memoryUsageCirclesRef,
    networkReceiveCarsRef: networkReceiveCarsRef,
    networkTransmitCarsRef: networkTransmitCarsRef,
    diskReadCylindersRef: diskReadCylindersRef,
    diskWriteCylindersRef: diskWriteCylindersRef,
  };

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
  }, [location]);

  useVisualUpdates(data, refs);

  useAnimation(refs);

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
