export const myfetch = async ({ api, method, data, query }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accesToken = user.accessToken;
    let res;
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accesToken}`);

    let raw;
    if (!!data) raw = JSON.stringify(data);
    else raw = undefined;

    var requestOptions = {
        method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    await fetch(`http://localhost:3030/` + api, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            res = result;
        })
        .catch((error) => console.log('error', error));
    return res;
};
