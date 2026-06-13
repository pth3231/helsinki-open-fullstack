import axios from 'axios';
const URL_BASE = "/api/persons";

export async function getAllPersons() {
    return axios
        .get(`${URL_BASE}`)
}

export async function createNewPerson(person) {
    return axios
        .post(`${URL_BASE}`, person)
}

export async function deletePersonById(id) {
    return axios
        .delete(`${URL_BASE}/${id}`)
}

export async function updateExistingPerson(id, person) {
    return axios
        .put(`${URL_BASE}/${id}`, person)
}