//import logo from './logo.svg';
import './Test.css';

//import React, { Component } from 'react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CRUDComponent() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const host='http://192.168.137.136:8000/api/enseignat';
  useEffect(() => {
    // Récupérer les données de l'API lorsque le composant est monté
    axios.get(host)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Fonction pour créer un nouvel enregistrement
  const handleCreate = event => {
    event.preventDefault();
    axios.post(host, formData)
      .then(response => {
        // Ajouter le nouvel enregistrement aux données existantes
        setData([...data, response.data]);
        // Réinitialiser le formulaire
        setFormData({});
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Fonction pour mettre à jour un enregistrement
  const handleUpdate = event => {
    event.preventDefault();
    axios.put(`${host}/${selectedId}`, formData)
      .then(response => {
        // Mettre à jour les données dans l'état
        setData(data.map(item => item.id === selectedId ? response.data : item));
        // Réinitialiser le formulaire et arrêter de mettre à jour
        setFormData({});
        setIsEditing(false);
        setSelectedId(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Fonction pour supprimer un enregistrement
  const handleDelete = id => {
    axios.delete(`${host}/enseignat/${id}`)
      .then(response => {
        // Supprimer l'enregistrement des données
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Fonction pour remplir le formulaire avec les données d'un enregistrement
  const handleEdit = id => {
    setIsEditing(true);
    setSelectedId(id);
    setFormData(data.find(item => item.id === id));
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>
            Nom:
            <input
              type="text"
              name="nom"
              value={formData.nom || ''}
              onChange={event => setFormData({ ...formData, nom: event.target.value })}
            />
          </label>
          <label>
            Prenom:
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ''}
              onChange={event => setFormData({ ...formData, prenom: event.target.value })}
            />
          </label>
          <label>
            Adresse:
            <input
              type="text"
              name="adress"
              value={formData.adress || ''}
              onChange={event => setFormData({ ...formData, adress: event.target.value })}
            />
          </label>
          <br />
       
          <br />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(true)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleCreate}>
          <label>
            Nom:
            <input
              type="text"
              name="nom"
              value={formData.nom || ''}
              onChange={event => setFormData({ ...formData, nom: event.target.value })}
            />
          </label>
          <label>
            Prenom:
            <input
              type="text"
              name="prenom"
              value={formData.prenom || ''}
              onChange={event => setFormData({ ...formData, prenom: event.target.value })}
            />
          </label>
          <label>
            Adresse:
            <input
              type="text"
              name="adress"
              value={formData.adress || ''}
              onChange={event => setFormData({ ...formData, adress: event.target.value })}
            />
          </label>
          <br />
          
          <button type="submit">Create</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.adress}</td>
              <td>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
export default CRUDComponent;
  // Fonction pour gérer les changements de saisie

