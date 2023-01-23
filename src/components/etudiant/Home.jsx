import React from 'react';
import { Spin } from 'antd';
import { getEtudiant, createEtudiant, updateEtudiant, deleteEtudiant } from './Api';
import Modal from 'react-modal';
import './style.css';
import FormData from 'form-data';


Modal.setAppElement('#app');

class Home extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nom: '',
      prenom: '',
      sexe: 'Homme',
      adresse: '',
      telephone: '034',
      etudiants: [],
      spin: false,
      isModalOpen: false,
      selectedFile: null,
    };

    this.add = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.refresh = this.refresh.bind(this);



  }



  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.setState({ spin: true });
    getEtudiant()
      .then(res => {
        this.setState({ spin: false });
        this.setState({ etudiants: res.data });       
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(event) {
    this.setIsModalOpen(false)
    this.setState({ spin: true });
    event.preventDefault();
    
    /*
    let data = {}
    if(this.state.selectedFile){
       data = {
        nom: this.state.nom,
        prenom: this.state.prenom,
        adresse: this.state.adresse,
        sexe: this.state.sexe,
        telephone: this.state.telephone,
        image:this.state.selectedFile.name.substring(0, this.state.selectedFile.name.lastIndexOf(".")),
        file:this.state.selectedFile,
      };
    }
    else{     
       data = {
        nom: this.state.nom,
        prenom: this.state.prenom,
        adresse: this.state.adresse,
        sexe: this.state.sexe,
        telephone: this.state.telephone,
        file:null,
      };
    }
    */
    

    
    
const data = new FormData();
    data.append('nom', this.state.nom);
    data.append('prenom', this.state.prenom);
    data.append('adresse', this.state.adresse);
    data.append('sexe', this.state.sexe);
    data.append('telephone', this.state.telephone);
    if(this.state.selectedFile){
      data.append('image', this.state.selectedFile.name.substring(0, this.state.selectedFile.name.lastIndexOf(".")));
      data.append('file', this.state.selectedFile);
    }
    else{     
      data.append('file', null);
    }
    

    if (this.add) {
      
      createEtudiant(data)
        .then(res => {
          this.setState({ spin: false });
          alert("Etudiant ajoute avec success ");
          this.refresh()
          this.setState({
            etudiants: [...this.state.etudiants, res.data]
          });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      updateEtudiant(this.state.id, data)
        .then(res => {
          this.setState({ spin: false });
          alert("Etudiant modifier avec success ");
          this.add = true
          this.refresh();
          const updatedEtudiant = this.state.etudiants.map(etudiant => {
            if (etudiant.id === this.state.id) {
              return res.data;
            }
            return etudiant;
          });
          this.setState({ etudiants: updatedEtudiant });
        })
        .catch(err => {
          console.error(err);
        });
    }

  }



  handleShow = id => {
    this.add = false;
    this.setIsModalOpen(true)
    const etudiants = this.state.etudiants.filter(etudiant => etudiant.id === id);
    this.setState({
      id: etudiants[0].id,
      nom: etudiants[0].nom,
      prenom: etudiants[0].prenom,
      sexe: etudiants[0].sexe,
      adresse: etudiants[0].adresse,
      telephone: etudiants[0].telephone,
    }
    );
  }



  handleDelete = id => {
    this.setState({ spin: true });
    deleteEtudiant(id)
      .then(() => {
        const updatedEtudiant = this.state.etudiants.filter(etudiant => etudiant.id !== id);
        this.setState({ etudiants: updatedEtudiant });
        this.setState({ spin: false });
        alert("Etudiant supprimer avec success ");
        this.refresh()
        this.add = true;
      })
      .catch(err => {
        console.error(err);
      });
  };

  refresh() {
    this.setState({
      nom: '',
      prenom: '',
      sexe: 'Homme',
      adresse: '',
      telephone: '',
      selectedFile:null,

    }
    );
  }

  setIsModalOpen(isModalOpen) {
    if (this.add === true) {
      this.refresh();
    }
    this.setState({
      isModalOpen: isModalOpen
    })
  }

  setIsModalOpenAdd(isModalOpen) {
    this.refresh();
    this.add = true;
    this.setState({
      isModalOpen: isModalOpen
    })
  }

  handleFileSelect(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  render() {
    return (
      <>
        <button onClick={() => this.setIsModalOpenAdd(true)}>Nouveau Etudiant</button>
        <Modal isOpen={this.state.isModalOpen} onRequestClose={() => this.setIsModalOpen(false)}>
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="id" value={this.state.id} />
            <label>
              Nom :
              <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange} required />
            </label>
            <label>
              Prenom :
              <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} required />
            </label>
            <label>
              Sexe :
              <input type="text" name="sexe" value={this.state.sexe} onChange={this.handleChange} required />
            </label>
            <label>
              Adresse :
              <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} required />
            </label>
            <label>
              Telephone :
              <input type="text" name="telephone" value={this.state.telephone} onChange={this.handleChange} required />
            </label>
            <label>
              Avatar :
              <input type="file" name="selectedFile"  onChange={this.handleFileSelect} />
              {this.state.selectedFile && <p>{this.state.selectedFile.name}</p>}
            </label>
            <input type="submit" value="Valider" />
            <input type="button" onClick={this.refresh} value="Actualiser" />
            <input type="button" onClick={() => this.setIsModalOpen(false)} value="Fermer" />
          </form>

        </Modal>


        <table>
          <thead></thead>
          <tbody>
            <tr>
           
              <th>Id</th>
              <th>Avatar</th>
              <th>Nom</th>
              <th>Prenom</th>
              <th>adresse</th>
              <th>Sexe</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>

            {this.state.etudiants.map((etudiant, k) =>
              <tr key={k}>
              <td>{etudiant.id}</td>
                <td>
                  <img src={etudiant.image} alt="{img.k}" />
                </td>
                
                <td>{etudiant.nom}</td>
                <td>{etudiant.prenom}</td>
                <td>{etudiant.adresse}</td>
                <td>{etudiant.sexe}</td>
                <td>{etudiant.telephone}</td>
                <td>
                  <button onClick={() => this.handleShow(etudiant.id)}>Edit</button>
                  <button onClick={() => this.handleDelete(etudiant.id)}>Delete</button>
                </td>
              </tr>
            )}

          </tbody>
          <tfoot></tfoot>
        </table>
        {this.state.spin ? (
          <Spin size="large" className='loading-icon' />
        ) : null}
      </>
    );
  }
}

export default Home;