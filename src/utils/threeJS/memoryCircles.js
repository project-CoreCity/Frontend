import * as THREE from "three";

const createCircleOutline = (scene, radius) => {
  const circleGeometry = new THREE.CircleGeometry(radius, 100);
  const edges = new THREE.EdgesGeometry(circleGeometry);
  const vertexShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 4.0);
    }
  `;
  const fragmentShader = `
    void main() {
      gl_FragColor = vec4(0.1294, 1.0, 0.3216, 1.0)
      ;
    }
  `;
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  const circleOutline = new THREE.LineSegments(edges, shaderMaterial);

  circleOutline.rotation.x = Math.PI / 2;
  circleOutline.position.set(0, 7, 0);

  scene.add(circleOutline);

  return circleOutline;
};

export const determinateNumberOfCircles = (data) => {
  if (!data) return 0;

  return Math.round(data / 10);
};

export const adjustCircleQuantity = (
  scene,
  numberOfCircles,
  circlesRef,
  color,
) => {
  circlesRef.current.forEach((circle) => scene.remove(circle));
  circlesRef.current = [];

  for (let i = 0; i < numberOfCircles; i++) {
    const radius = i * 1;
    const newCircle = createCircleOutline(scene, radius, color);

    circlesRef.current.push(newCircle);
  }
};

export const movementOfCircles = (circles) => {
  const time = Date.now() * 0.001;
  const scaleAmplitude = 0.5;
  const baseScale = 1.5;
  const scale = Math.sin(time) * scaleAmplitude + baseScale;

  circles.forEach((circle) => {
    circle.scale.set(scale, scale, scale);
  });
};
