import React, { Component } from 'react';
import api from '../../services/api'
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { MdInsertDriveFile } from 'react-icons/md';
import logo from '../../assets/backupLogo.svg';
import './styles.css';
import Dropzone from 'react-dropzone'
import { logout } from "../../services/auth";

export default class Box extends Component {

  state = { box: {} }

  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`/box/${box}`)

    this.setState({ box: response.data });

  }

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;

      data.append('file', file);

      api.post(`/box/${box}/file`, data);
    });
  }

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  render() {
    
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>{this.state.box.name}</h1>
          <button className="btn" type="button" onClick={this.handleLogout}>Salir</button>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({getRootProps, getInputProps}) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()}/>
              <p>Arrastre archivos o haga click aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {this.state.box.archivos && this.state.box.archivos.map(file => (
            <li key={file.id}>
              <a className="fileInfo" href={file.image_url} target="blank">
                <MdInsertDriveFile size={24} color="#A5Cfff" />
                <strong>{file.name}</strong>
                
                
              </a>
              <span>
                Creado hace {" "}
                {formatDistance(new Date(file.createdAt), new Date(), {
                  locale: es
                })}</span>
            </li>
          ))}
        </ul>
        
      <div>
    )
  }
}

