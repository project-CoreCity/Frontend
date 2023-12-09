export const goBackToHome = (navigate) => {
  navigate("/");
};

export const goToDashboard = (navigate, address) => {
  navigate("/dashboard", { state: { address: address } });
};
