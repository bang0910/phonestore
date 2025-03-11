import Http from "./Http";

export const getProducts = (config) => {
  return Http.get("/products", config);
};
export const getCategories = (config) => {
  return Http.get("/categories", config);
};
export const getCategory = (id, config) => {
  return Http.get(`/categories/${id}`, config);
};
export const getProductsByCategory = (id, config) => {
  return Http.get(`/categories/${id}/products`, config);
};
export const getProductById = (id, config) => {
  return Http.get(`/products/${id}`, config);
};
export const getProductByName = (id, config) => {
  return Http.get(`/products/${id}`, config);
};
export const getComments = (id, config) => {
  return Http.get(`/products/${id}/comments`, config);
};
export const postComment = (id, data) => {
  return Http.post(`products/${id}/comments`, data);
};
// export const getSliders = (config) => {
//   return Http.get("/Slider", config);
// };
export const loginCustomer = (data) => Http.post("/customers/login", data);
export const postOrder = (data) => Http.post("/order", data);
export const registerCustomer = (data) =>
  Http.post("/customers/register", data);
export const logoutCustomer = (id, config) =>
  Http.get(`customers/${id}/logout`, config);
