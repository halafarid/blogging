import { apiUrl } from './config.json';
import axios from 'axios';

export function getAll() {
    return axios.get(`${apiUrl}/authors`);
};

export function getById(id) {
    return axios.get(`${apiUrl}/authors/profile/${id}`);
}

export function update(id) {
    return axios.update(`${apiUrl}/authors/${id}`);
}

export function remove(id) {
    return axios.delete(`${apiUrl}/authors/${id}`);
}

export function getProfile() {
    return axios.get(`${apiUrl}/authors/profile`);
}

export function handleFollows(id) {
    return axios.post(`${apiUrl}/authors/${id}/follows`);
}

export function getFollowing() {
    return axios.get(`${apiUrl}/authors/following`);
}

export function getFollowers() {
    return axios.get(`${apiUrl}/authors/followers`);
}