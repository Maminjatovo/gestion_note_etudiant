import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export function getEtudiant() {
  return axios.get(`${API_URL}/etudiant`);
}

export function createEtudiant(data) {
  return axios.post(`${API_URL}/etudiant`, data);
}

export function updateEtudiant(id, data) {
  return axios.post(`${API_URL}/etudiant/${id}`, data);
}

export function deleteEtudiant(id) {
  return axios.delete(`${API_URL}/etudiant/${id}`);
}

export function showEtudiant(id) {
  return axios.get(`${API_URL}/etudiant/${id}`);
}