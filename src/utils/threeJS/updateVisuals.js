import {
  objectPositionsAndSizes,
  objectColors,
} from "@/utils/threeJS/objectStyles";
import { adjustBuildingHeight } from "@/utils/threeJS/cpuBuildings";
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

export const updateVisuals = (data, refs) => {
  if (data) {
    const numberOfMemoryUsageCircles = determinateNumberOfCircles(
      data.memoryMetrics.mainDisplay,
    );
    const numberOfCars = determineNumberOfCars(data.networkMetrics.mainDisplay);
    const numberOfDiskReadCylinders = determinateNumberOfCylinders(
      data.diskMetrics.mainDisplay[0],
    );
    const numberOfdiskWriteCylinders = determinateNumberOfCylinders(
      data.diskMetrics.mainDisplay[1],
    );

    adjustBuildingHeight(
      refs.cpuUsageTotalBuildingRef,
      data.cpuMetrics.mainDisplay,
    );
    adjustBuildingHeight(
      refs.cpuUsageUserBuildingRef,
      data.cpuMetrics.cpuUsageUser,
    );
    adjustBuildingHeight(
      refs.cpuUsageSystemBuildingRef,
      data.cpuMetrics.cpuUsageSystem,
    );

    adjustCircleQuantity(
      refs.sceneRef.current,
      numberOfMemoryUsageCircles,
      refs.memoryUsageCirclesRef,
    );

    adjustCarQuantity(
      refs.sceneRef.current,
      numberOfCars.transmit,
      refs.networkTransmitCarsRef,
      objectColors.networkTransmitCarColor,
    );
    adjustCarQuantity(
      refs.sceneRef.current,
      numberOfCars.receive,
      refs.networkReceiveCarsRef,
      objectColors.networkReceiveCarColor,
    );

    adjustCylinderQuantity(
      refs.sceneRef.current,
      numberOfDiskReadCylinders,
      refs.diskReadCylindersRef,
      objectPositionsAndSizes.diskReadCylinder.position,
      objectColors.diskReadCylinderColor,
    );
    adjustCylinderQuantity(
      refs.sceneRef.current,
      numberOfdiskWriteCylinders,
      refs.diskWriteCylindersRef,
      objectPositionsAndSizes.diskWriteCylinder.position,
      objectColors.diskWriteCylinderColor,
    );
  }
};
