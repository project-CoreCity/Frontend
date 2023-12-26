export const handleResize = (rendererRef, mountRef, camera) => {
  const size = mountRef.current.clientWidth;

  rendererRef.current.setSize(size, size);

  camera.aspect = 1;
  camera.updateProjectionMatrix();
};
