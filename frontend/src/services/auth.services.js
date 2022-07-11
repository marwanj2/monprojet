import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (firstname, lastname, phone, type, password) => {
  return axios.post(API_URL + "signup", {
    firstname,
    lastname,
    phone,
    type,
    password,
  });
};

const login = (phone, password) => {
  return axios
    .post(API_URL + "signin", {
      phone,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};