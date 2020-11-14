import React, { useContext, useState } from 'react';
import './sing-in.css';

import { useForm } from '../../hooks/useForm/useForm';

const initialForm = {
    nombre: '',
    email: '',
    password: '',
    password2: '',
    rol: 'medico',
};

export const SingIn = ({ history }) => {
    const [formValues, handleInputChange, reset] = useForm(initialForm);
    const { nombre, email, password, password2, rol } = formValues;
    const [loginerror, setLoginerror] = useState(false);
    console.log('error state', loginerror);
    const handleLogin = () => {
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        var raw = `{"name": "${nombre}","email": "${email}","password": "${password}","rol": "${rol}"}`;
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:3030/users', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (!!result.name) {
                    history.push('/login');
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
                    <h3 className='text-center'>Nuevo registro</h3>

                    <div className='form-group text-left'>
                        <label>Nombre</label>
                        <input
                            type='text'
                            className={
                                loginerror
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            }
                            placeholder='Su nombre'
                            value={nombre}
                            name='nombre'
                            onChange={handleInputChange}
                        />
                        <div class='invalid-feedback'>Seleccione un nombre</div>

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
                        <div class='invalid-feedback'>Repita contraseña</div>
                        <label>Repita contraseña</label>
                        <input
                            type='password'
                            className={
                                loginerror
                                    ? 'form-control is-invalid'
                                    : 'form-control'
                            }
                            placeholder='Enter password'
                            value={password2}
                            name='password2'
                            onChange={handleInputChange}
                        />
                        <div class='invalid-feedback'>
                            Contraseña no coinside
                        </div>
                        <label for='exampleFormControlSelect1'>
                            Seleccione un rol
                        </label>
                        <select
                            class='form-control'
                            id='exampleFormControlSelect1'
                            value={rol}
                            name='rol'
                            onChange={handleInputChange}
                        >
                            <option>medico</option>
                            <option>asistente</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='btn btn-dark btn-lg btn-block mt-5'
                    >
                        Registro
                    </button>
                </form>
            </div>
        </div>
    );
};
