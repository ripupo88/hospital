import React, { useEffect, useState } from 'react';

export const HomePage = () => {
    let myHeaders = new Headers();
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append(
            'Authorization',
            `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDUzNzMwODUsImV4cCI6MTYwNTQ1OTQ4NSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWZhZWM4ZDA3ZDk2ZGMzYTdjYmRkMWU2IiwianRpIjoiMDhlNjA1MTYtNGRkNS00OTdmLWIyYmItYmRjYmM3MWZkMGUxIn0.EoyCBl3i5T7Zo8IJTJe5XWdA4j8F0LUO3VEzgvuz6oc'}`
        );

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch('http://localhost:3030/pacientes', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setPacientes(result.data);
            })
            .catch((error) => console.log('error', error));
    }, [pacientes]);

    return (
        <div class='list-group'>
            <a href='#' class='list-group-item list-group-item-action active'>
                Lista de pacientes
            </a>
            {pacientes.map((element) => (
                <a
                    id={element.id}
                    href='#'
                    class='list-group-item list-group-item-action'
                >
                    {element.name}
                </a>
            ))}
        </div>
    );
};
