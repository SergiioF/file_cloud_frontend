import React, { useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/backupLogo.svg';
import './styles.css';

function Register({history}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        await api.post('/register', { name, email, password })

        history.push('/');
    };

    return (

        <div className="container">
            <img src={logo} alt="Quiero Fruta" />
            <div className="content">
                <p className="textRegister">
                    Rellena los campos con tus datos:
                        </p>
                <form onSubmit={handleSubmit}>

                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Digite su correo electronico"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="name"
                            id="name"
                            required
                            placeholder="Digite su nombre"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Digite su contraseña"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    
                    <button className="btnR" type="submit">Registrarme</button>
                    <hr />
                        <Link to="/">Iniciar sesión</Link>
                </form>
            </div>
        </div>

    )
}

export default withRouter(Register);


