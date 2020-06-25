import React, { useState } from 'react';
import logo from '../../assets/backupLogo.svg';
import api from '../../services/api';
import './stylees.css';

function ForgotPassword({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        await api.post('/forgot_password', { email })
       

        history.push('/');
    };

    return (
        <div className="bg">
            <div className="container">
                <img src={logo} alt="Quiero Fruta" />

                <div className="content">
                    <p >
                        Escriba su dirección de correo electrónico, esto le enviará un email
                        al correo ingresado con los pasos para reestablecer su contraseña.
                     </p>
                    <form  onSubmit={handleSubmit} >
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

                        <button className="btn" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ForgotPassword;