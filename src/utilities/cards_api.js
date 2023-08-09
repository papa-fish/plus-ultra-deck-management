import axios from "axios";

export function fetchCards() {
    return axios.get("/cards")
        .then(res => res)
};