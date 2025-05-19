export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token; // return true if token exists
};

export const userInfo = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};
