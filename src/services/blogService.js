import { apiUrl } from './config.json';
import axios from 'axios';

export function getAll(pageNo, size) {
    return axios.get(`${apiUrl}/blogs?pageNo=${pageNo}&size=${size}`);
};

export function post(blog) {
    return axios.post(`${apiUrl}/blogs`, blog);
}

export function update(id, blog) {
    return axios.patch(`${apiUrl}/blogs/${id}`, blog);
}

export function remove(id) {
    return axios.delete(`${apiUrl}/blogs/${id}`);
}

export function getAuthorBlogs(id, pageNo, size) {
    return axios.get(`${apiUrl}/blogs/${id}?pageNo=${pageNo}&size=${size}`);
}

export function getBlogsOnSearch(type, data) {
    return axios.get(`${apiUrl}/blogs?${type}=${data}`);
}