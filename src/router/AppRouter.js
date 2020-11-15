import { Switch, Route, Redirect } from 'react-router-dom';
import { MainNavbar } from '../components/navbar/Navbar';

import { HomePage } from '../components/pages/HomePage';
import { NewPatient } from '../components/pages/NewPatient';
import { PacientePage } from '../components/pages/PacientePage';

export const AppRouter = ({ history }) => {
    return (
        <>
            <MainNavbar history={history} />
            <Switch>
                <Route path='/new' component={NewPatient} />
                <Route path='/paciente/:id' component={PacientePage} />
                <Route path='/' component={HomePage} />
            </Switch>
        </>
    );
};
