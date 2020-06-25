import React, { Component } from 'react'
import api from '../../services/api'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import { MdMovie } from 'react-icons/md'
import logo from '../../assets/backupLogo.svg';
import './styles.css'
import Popup from 'reactjs-popup'
import { logout } from "../../services/auth";

export default class Box extends Component {
  state = {
    name:"",
    link:"",
    subbox: {} 
  }

  async componentDidMount() {
    const subbox = this.props.match.params.id
    const response = await api.get(`/subbox/${subbox}`)

    this.setState({ subbox: response.data })
  }

  handleSubmit = async e => {
    e.preventDefault();
    const subbox = this.props.match.params.id
    const response = await api.post(`subbox/${subbox}/video`, { 
      name: this.state.name, link: this.state.link 
    })

  }
  
  handleNameChange = (e) => {
    this.setState({
    name: e.target.value,
    })

  }

  handleLinkChange = (e) => this.setState({
    link: e.target.value,
  })

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div id='box-container'>
        <header>
          <img src={logo} alt='' />
          <h1>{this.state.subbox.name}</h1>
          <button className="btn" type="button" onClick={this.handleLogout}>Salir</button>
        </header>

        <div id="input-container">

          <form onSubmit={this.handleSubmit}>
            <input 
            placeholder="Asigne un nombre al video"
            value={this.state.name}
            onChange={this.handleNameChange}
            />

            <input 
            placeholder="Ingrese el link del video"
            value={this.state.link}
            onChange={this.handleLinkChange}
            />

            <button type="submit">Crear</button>
          </form>

        </div>

        <ul>
          {this.state.subbox.videos &&
            this.state.subbox.videos.map(video => (
              <li key={video.id}>
                <MdMovie size={24} color='#A5Cfff' />
                <Popup trigger={<p className="button">{video.name}</p>} modal>
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;
                      </button>
                      <div className="header">{video.name}</div>
                      <div className="content">
                        <iframe frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen src={video.link} title={video.name}>
                            
                          </iframe>
                      </div>
                    </div>
                  )}
                </Popup>

                <span>
                  Creado hace{' '}
                  {formatDistance(new Date(video.createdAt), new Date(), {
                    locale: es
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}
