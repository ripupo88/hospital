import React from 'react';
import { useForm } from '../../hooks/useForm/useForm';

const initialForm = {
    name: '',
    nationality: '',
    birth: '',
    sexH: false,
    sexM: false,
    resumen: '',
};

export const Form = ({ history }) => {
    const [formValues, handleInputChange, reset] = useForm(initialForm);
    const { name, nationality, birth, sexH, sexM, resumen } = formValues;
    const handleSubmit = (event) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');

        var raw = {
            name,
            nationality,
            birth,
            sexH,
            sexM,
            resumen,
        };
        raw = JSON.stringify(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:3030/pacientes', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (!!result.name) {
                    history.push('/');
                } else {
                    reset();
                }
            })
            .catch((error) => console.log('error', error));
    };
    return (
        <div>
            <h2 className='text-center mt-4'>Nuevo paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Nombre Completo</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Nombre del paciente'
                        name='name'
                        onChange={handleInputChange}
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className='row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor='exampleInputPassword1'>
                            Nacionalidad
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='País de origen'
                            name='nationality'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group col-md-6'>
                        <label htmlFor='exampleInputPassword1'>
                            Nacimiento
                        </label>
                        <input
                            type='date'
                            className='form-control'
                            placeholder='31/12/1999'
                            name='birth'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <div className='form-check form-check-inline'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='sexH'
                            id='inlineRadio1'
                            defaultValue='option1'
                            onChange={handleInputChange}
                        />
                        <label
                            className='form-check-label'
                            htmlFor='inlineRadio1'
                        >
                            Hombre
                        </label>
                    </div>
                    <div className='form-check form-check-inline'>
                        <input
                            className='form-check-input'
                            type='radio'
                            name='sexM'
                            id='inlineRadio2'
                            defaultValue='option2'
                            onChange={handleInputChange}
                        />
                        <label
                            className='form-check-label'
                            htmlFor='inlineRadio2'
                        >
                            Mujer
                        </label>
                    </div>
                </div>
                <hr />
                <label htmlFor='exampleFormControlTextarea1'>Resúmen</label>
                <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    onChange={handleInputChange}
                ></textarea>

                <button type='submit' className='btn btn-primary m-4'>
                    Agregar
                </button>
                <button type='submit' className='btn btn-outline-primary m-4'>
                    Cancelar
                </button>
            </form>
        </div>
    );
};
