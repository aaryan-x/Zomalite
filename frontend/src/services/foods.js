import UserService from "./users";
import axios from "axios";

axios.defaults.baseURL = "/api";

const addFood = async (food) => {
  const res = await axios.post("/food/add", food).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  if (res.data) {
    return {
      status: 0,
      ...res.data,
    };
  } else {
    return res;
  }
};

const getAll = async () => {
  UserService.setToken();
  const res = await axios.get("/food/all").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const getRecFoods = async () => {
  UserService.setToken();
  const res = await axios.get("/food/getRecFoods").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  console.log(res.data);

  return res.data;
};

const editFood = async (data) => {
  UserService.setToken();
  const res = await axios.post("/food/editFood", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const deleteFood = async (data) => {
  UserService.setToken();
  const res = await axios.post("/food/deleteFood", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const exportModule = {
  addFood,
  getAll,
  getRecFoods,
  editFood,
  deleteFood,
};

export default exportModule;
