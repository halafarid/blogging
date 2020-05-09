import { apiUrl } from './config.json';
import axios from 'axios';

export function getAll() {
    return axios.get(`${apiUrl}/blogs`);
};

export function post(blog) {
    return axios.post(`${apiUrl}/blogs`, blog);
}

export function update(id) {
    return axios.update(`${apiUrl}/blogs/${id}`);
}

export function remove(id) {
    return axios.delete(`${apiUrl}/blogs/${id}`);
}

export function getAuthorBlogs(id) {
    return axios.get(`${apiUrl}/blogs/${id}`);
}