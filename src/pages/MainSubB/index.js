import React, { Component } from 'react';
import api from '../../services/api'
import "./styles.css";
import { MdFolder } from 'react-icons/md';
import logo from '../../assets/backupLogo.svg';
import { logout } from "../../services/auth";


export default class MainSubB extends Component {
  state = {
    newBox: "",
    subbox: []
  }

  async componentDidMount() {
    const response = await api.get('/subbox')

    this.setState({ subbox: response.data });

  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('/subbox', { name: this.state.newBox })

  }

  handleInputChange = e => {
    this.setState({ newBox: e.target.value })
  }

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  // Aqui se enlistan las carpetas //
  render() {
    return (

      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <button className="btn" type="button" onClick={this.handleLogout}>Salir</button>
        </header>

        <div id="input-container">

          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Crear carpeta"
              value={this.state.newBox}
              onChange={this.handleInputChange}
            />

            <button type="submit">Crear</button>
          </form>

        </div>

        <ul>
          {this.state.subbox.map(subox => (
            <li key={subox.id}>
              <a className="fileInfo" href={`/subbox/${subox.id}`} target="blank">
                <MdFolder size={24} color="#A5Cfff" />
                <strong>{subox.name}</strong>
              </a>
            </li>
          ))}
        </ul>


      </div>

    );
  }
}
