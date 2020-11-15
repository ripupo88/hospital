import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { Login } from '../components/login/login';
import { SingIn } from '../components/sing-in/sing-in';
import { AppRouter } from './AppRouter';

export const MainRouter = () => {
    const {
        user: { logged },
    } = useContext(AuthContext);

    return (
        <Router>
            <Switch>
                {logged ? ( //Muestro (DashboardRoutes) si (logged)
                    <>
                        <Route path='/' component={AppRouter} />
                        <Redirect to='/' />
                    </>
                ) : (
                    <>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/singin' component={SingIn} />
                        <Route path='/' component={SingIn} />
                    </>
                )}
            </Switch>
        </Router>
    );
};
