import React, { useContext, lazy, Suspense } from 'react';
import { Router } from '@reach/router';

import AuthContext from './context/auth-context';
import NotFound from './pages/NotFound';
import { useSelector } from './store';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainPage = lazy(() => import('./pages/MainPage'));

const userSelector = state => state.user.user;
function App() {
    const { token } = useContext(AuthContext);
    const user = useSelector(userSelector);

    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Router>
                {token && user ? (
                    <MainPage path="/*" />
                ) : (
                    <LoginPage path="/login" />
                )}
                <NotFound default />
            </Router>
        </Suspense>
    );
}

export default App;
