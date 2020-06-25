import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';

import logo from '../../assets/backupLogo.svg';
import './styles.css';


//Cuando usar funcion y cuando usar class, porque al ser function
//no se puede usar el render
function Login({ history }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/login', { email, password })
    login(response.data.token);

    history.push('/main');
  };


  return (
    <div className="bg">
      <div className="container">
        <img src={logo} alt="Quiero Fruta" />

        <div className="content">
          <strong>
            Bienvenido !
                </strong>

          <form onSubmit={handleSubmit}>

            <div className="input-block">
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                autoComplete="username"
                required
                placeholder="Digite su correo electronico"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="password">Contraseña *</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                required
                placeholder="Digite su contraseña"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <Link to="/forgot_password" className="forgot">Olvidaste tu contraseña?</Link>
            <button className="btnL" type="submit">Entrar</button>
            <hr />
            <Link to="/register">Registrarse</Link>
          </form>
        </div>
      </div>

    </div>
  )
}
export default withRouter(Login);