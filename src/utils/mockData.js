export const generateMockData = (randomInt) => {
  const mockData = {
    cpuMetrics: {
      mainDisplay: [`${randomInt / 5} %`],
      cpuUsageUser: "Mock data",
      cpuUsageSystem: "Mock data",
    },
    memoryMetrics: {
      mainDisplay: [`${randomInt}`],
      memoryFree: "Mock data",
      swapUsed: "Mock data",
      totalMemory: "Mock data",
    },
    networkMetrics: {
      mainDisplay: [`${randomInt} KB`, `${randomInt} KB`],
      totalNetworkReceived: "Mock data",
      totalNetworkTransmitted: "Mock data",
    },
    diskMetrics: {
      mainDisplay: [`${randomInt * 5} KB`, `${randomInt * 5} KB`],
      readOperations: "Mock data",
      writeOperations: "Mock data",
      totalRead: "Mock data",
      totalWritten: "Mock data",
      readingTime: "Mock data",
      writingTime: "Mock data",
    },
  };

  return mockData;
};
