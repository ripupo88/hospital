import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const MainNavbar = ({ history }) => {
    const { dispatch } = useContext(AuthContext);
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const name = userStorage.user.name;
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch({ type: types.logout });
        history.push('/login');
    };
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link to='/'>
                    <a className='navbar-brand' href='/'>
                        Control
                    </a>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarTogglerDemo02'
                    aria-controls='navbarTogglerDemo02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon' />
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarTogglerDemo02'
                >
                    <ul className='navbar-nav m-auto mt-2 mt-lg-0'>
                        <li className='nav-item'>
                            <NavLink
                                to='/new'
                                className='nav-link'
                                activeClassName='active'
                            >
                                Nuevo
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>
                                Link
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link disabled' href='#'>
                                Disabled
                            </a>
                        </li>
                        <li>
                            <form className='form-inline my-2 my-lg-0'>
                                <input
                                    className='form-control mr-sm-2'
                                    type='search'
                                    placeholder='Search'
                                />
                                <button
                                    className='btn btn-outline-success my-2 my-sm-0'
                                    type='submit'
                                >
                                    Search
                                </button>
                            </form>
                        </li>
                        <li>
                            <figcaption class='figure-caption m-2 ml-5'>
                                <a href='/'>{name}</a>
                            </figcaption>
                        </li>
                        <li class='nav-item dropdown'>
                            <div
                                class='nav-link dropdown-toggle m-0 p-0'
                                href='#'
                                id='navbarDropdown'
                                role='button'
                                data-toggle='dropdown'
                                aria-haspopup='true'
                                aria-expanded='false'
                            >
                                <img
                                    src='/assets/img/person.svg'
                                    alt=''
                                    width='32'
                                    height='32'
                                    title='Bootstrap'
                                />
                            </div>
                            <div
                                class='dropdown-menu'
                                aria-labelledby='navbarDropdown'
                            >
                                <a class='dropdown-item' href='#'>
                                    Action
                                </a>
                                <a class='dropdown-item' href='#'>
                                    Another action
                                </a>
                                <div class='dropdown-divider'></div>
                                <div
                                    onClick={handleLogout}
                                    class='btn dropdown-item'
                                >
                                    Cerrar sesion
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
