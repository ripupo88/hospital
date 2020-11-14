import React from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';

const initialForm = {
    name: '',
    nationality: '',
    birth: '',
    sex: 'hombre',
    resumen: '',
};

export const Form = () => {
    const history = useHistory();
    const [formValues, handleInputChange, reset] = useForm(initialForm);
    const { name, nationality, birth, sex, resumen } = formValues;
    const handleSubmit = (event) => {
        event.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
            'Authorization',
            `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDUzNzMwODUsImV4cCI6MTYwNTQ1OTQ4NSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWZhZWM4ZDA3ZDk2ZGMzYTdjYmRkMWU2IiwianRpIjoiMDhlNjA1MTYtNGRkNS00OTdmLWIyYmItYmRjYmM3MWZkMGUxIn0.EoyCBl3i5T7Zo8IJTJe5XWdA4j8F0LUO3VEzgvuz6oc'}`
        );

        var raw = {
            name,
            nationality,
            birth,
            sex,
            resumen,
        };
        console.log(raw);
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
                if (!!result.name) {
                    console.log('nameeeeee', result.name);
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
                            name='sex'
                            id='inlineRadio1'
                            defaultValue='hombre'
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
                            name='sex'
                            id='inlineRadio2'
                            defaultValue='mujer'
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
                    name='resumen'
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
