import axios from "axios";

const API_URL = "http://localhost:8080/api/";
const getMat = () =>{
    return  axios.get(`${API_URL}` + "materials")
}

const addMat = (id, body) =>{
    return axios.post("http://localhost:8080/api/material",body)
}

export default { getMat, addMat };