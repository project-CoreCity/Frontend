export const getGradient = (ctx, chartArea, startColor, endColor) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top * 1.5,
  );

  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);

  return gradient;
};

export const getGradientReverse = (ctx, chartArea, startColor, endColor) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom * 1.5,
    0,
    chartArea.top,
  );

  gradient.addColorStop(0, startColor);
  gradient.addColorStop(1, endColor);

  return gradient;
};
