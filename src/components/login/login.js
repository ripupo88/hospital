import React, { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import './login.css';

import { useForm } from '../../hooks/useForm/useForm';

const initialForm = {
    email: '',
    password: '',
};

export const Login = ({ history }) => {
    const [formValues, handleInputChange, reset] = useForm(initialForm);
    const { email, password } = formValues;
    const { dispatch } = useContext(AuthContext);
    const [loginerror, setLoginerror] = useState(false);
    console.log('error state', loginerror);
    const handleLogin = () => {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        var raw = `{"strategy": "local","email": "${email}","password": "${password}"}`;
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:3030/authentication', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (!!result.accessToken) {
                    localStorage.setItem('user', JSON.stringify('result'));
                    dispatch({ type: types.login, payload: result });
                    history.push('/');
                } else {
                    reset();
                    setLoginerror(true);
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className='father-box'>
            <div className='loginbox'>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleLogin(email, password);
                    }}
                >
                    <h3 className='text-center'>Iniciar sesión</h3>

                    <div className='form-group text-left'>
                        <label>Correo</label>
                        <input
                            type='email'
                            className={
                                loginerror
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            }
                            placeholder='Enter email'
                            value={email}
                            name='email'
                            onChange={handleInputChange}
                        />
                        <div class='invalid-feedback'>
                            Seleccione un usuario correcto
                        </div>
                    </div>

                    <div className='form-group text-left'>
                        <label>Contraseña</label>
                        <input
                            type='password'
                            className={
                                loginerror
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            }
                            placeholder='Enter password'
                            value={password}
                            name='password'
                            onChange={handleInputChange}
                        />
                        <div class='invalid-feedback'>
                            Introduzca su contraseña
                        </div>
                    </div>

                    <div className='form-group text-left'>
                        <div className='custom-control custom-checkbox'>
                            <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customCheck1'
                            />
                            <label
                                className='custom-control-label'
                                htmlFor='customCheck1'
                            >
                                Recordar
                            </label>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='btn btn-dark btn-lg btn-block'
                    >
                        Entrar
                    </button>
                    <p className='forgot-password text-right'>
                        Olvidaste <a href='#'>contraseña?</a>
                    </p>
                </form>
            </div>
        </div>
    );
};
