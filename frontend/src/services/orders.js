import UserService from "./users";
import axios from "axios";

axios.defaults.baseURL = "/api";

const addOrder = async (order) => {
  const res = await axios.post("/order/add", order).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  if (res.status == 1) {
    return {
      status: 1,
      ...res.data,
    };
  }

  return {
    status: 0,
    ...res.data,
  };
};

const getAll = async () => {
  UserService.setToken();
  const res = await axios.get("/order/all").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const updateOrder = async (data) => {
  UserService.setToken();
  const res = await axios.post("/order/updateStatus", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const exportModule = {
  addOrder,
  getAll,
  updateOrder,
};

export default exportModule;
