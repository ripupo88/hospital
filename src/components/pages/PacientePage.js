import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { myfetch } from '../../fetch';
import './pacientePage.css';

export const PacientePage = () => {
    const { id } = useParams();
    const [myresult, setMyresult] = useState('');

    useEffect(() => {
        const myefect = async () => {
            const res = await myfetch({
                api: `pacientes/${id}`,
                method: 'GET',
            });
            if (!!res) setMyresult(res);
        };
        myefect();
    });
    return (
        <>
            <div className='cont'>
                <h3>{myresult.name}</h3>
            </div>
            <div className='dat'>
                <p>
                    Nacionalidad: <b>{myresult.nationality}</b>
                </p>
                <p>
                    Resúmen: <b>{myresult.resumen}</b>
                </p>
            </div>
        </>
    );
};
