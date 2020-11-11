import { useEffect, useReducer } from 'react';
import { MainRouter } from './router/router';
import { AuthContext } from './auth/AuthContext';
import { authReducer } from './auth/authReducer';

import './App.css';

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

function App() {
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <MainRouter />
        </AuthContext.Provider>
    );
}

export default App;
