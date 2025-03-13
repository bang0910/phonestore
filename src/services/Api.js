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
//login
export const loginCustomer = (data) => Http.post("/customers/login", data);
//order
export const order = (data) => Http.post("/order", data);
//register
export const registerCustomer = (data) =>
  Http.post("/customers/register", data);
//logout
export const logoutCustomer = (id) => Http.get(`customers/${id}/logout`);
// orderList
export const orderList = (id) => Http.get(`customers/${id}/orders`);

export const orderDetail = (id) => {
  return Http.get(`/customer/orders/${id}`);
};
export const cancelOrder = (id) => {
  return Http.get(`/customer/orders/${id}/canceled`);
};
export const updateCustomer = (id, data) => {
  return Http.post(`/customers/${id}/update`, data);
};
export const refreshToken = () => {
  return Http.get("/customer/refreshtoken");
};
