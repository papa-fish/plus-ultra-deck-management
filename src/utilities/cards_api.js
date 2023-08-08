import axios from "axios";

export function fetchCards() {
    return axios.get("http://localhost:8080/")
        .then(res => res)
};