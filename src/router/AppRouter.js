import { Switch, Route, Redirect } from 'react-router-dom';
import { MainNavbar } from '../components/navbar/Navbar';

import { HomePage } from '../components/pages/HomePage';

export const AppRouter = () => {
    return (
        <>
            <MainNavbar />
            <Switch>
                <Route path='/' component={HomePage} />
                <Redirect to='/' />
            </Switch>
        </>
    );
};
