import axiosClient from "./axiosClient";

const gameApi = {
  getAll: () => axiosClient.get("/games"),
  getById: (id) => axiosClient.get(`/games/${id}`),
  search: (keyword) => axiosClient.get(`/games/search?q=${encodeURIComponent(keyword)}`),

  getByCategoryId: (id) => axiosClient.get(`/games/category/${id}`),
  getByCategoryName: (name) => axiosClient.get(`/games/category/name/${name}`)
};

export default gameApi;
