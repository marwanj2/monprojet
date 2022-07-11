import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const updatedUser = (id, body) =>{
    return axios.put(`http://localhost:8080/api/users/${id}`, body)
}

const getUsers = () =>{
    return axios.get("http://localhost:8080/api/users")
}

const transaction = (id, body) =>{
    return axios.post(`${API_URL}users/transaction`, body)
}

export default {updatedUser, getUsers, transaction};