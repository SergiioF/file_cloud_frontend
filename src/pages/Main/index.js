import React, { Component } from 'react';
import api from '../../services/api'
import "./styles.css";
import { MdFolder } from 'react-icons/md';
import logo from '../../assets/backupLogo.svg';
import { logout } from "../../services/auth";

export default class Main extends Component {
  state = {
    newBox: "",
    box: []
  }

  async componentDidMount() {
    const response = await api.get('/box')

    this.setState({ box: response.data });

  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('box', { name: this.state.newBox })

  }

  handleInputChange = e => {
    this.setState({ newBox: e.target.value })
  }

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (

      <div id="box-container">
        <header className="header">
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
          <li >
            <a className="fileInfo" href="/subbox" target="blank">
              <MdFolder size={24} color="#A5Cfff" />
              <strong>Videos</strong>
            </a>
          </li>

          {this.state.box.map(box => (
            <li key={box.id}>
              <a className="fileInfo" href={`/box/${box.id}`} target="blank">
                <MdFolder size={24} color="#A5Cfff" />
                <strong>{box.name}</strong>
              </a>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}
