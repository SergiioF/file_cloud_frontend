import React, { useState } from 'react';
import logo from '../../assets/backupLogo.svg';
import api from '../../services/api';
import './styles.css';

function ResetPassword({ history }) {

    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        await api.post('/reset_password', { password })
       
        history.push('/');
    };

    return (
        <div className="bg">
            <div className="container">
                <img src={logo} alt="Quiero Fruta" />

                <div className="content">
                    <p >
                        Escriba su nueva contraseña.
                     </p>
                    <form  onSubmit={handleSubmit} >
                        <div className="input-block">
                            <label htmlFor="email">Password *</label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                required
                                placeholder="Digite una nueva contraseña"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>

                        <button className="btn" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ResetPassword;