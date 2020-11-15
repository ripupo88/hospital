import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { myfetch } from '../../fetch';

export const HomePage = () => {
    const sear = useLocation().search;
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        const myefect = async () => {
            let myresult = await myfetch({
                api: 'pacientes',
                method: 'GET',
                query: sear,
            });
            if (!!myresult) setPacientes(myresult.data);
        };
        myefect();
    });

    return (
        <div class='list-group'>
            <a href='/' class='list-group-item list-group-item-action active'>
                Lista de pacientes
            </a>
            {pacientes.map((element) => (
                <Link
                    to={`/paciente/${element._id}`}
                    className='list-group-item list-group-item-action'
                >
                    {element.name}
                </Link>
            ))}
        </div>
    );
};
