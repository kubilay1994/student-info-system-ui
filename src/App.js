import React, { useContext, lazy, Suspense } from 'react';
import { Router } from '@reach/router';

import AuthContext from './context/auth-context';
import NotFound from './pages/NotFound';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MainPage = lazy(() => import('./pages/MainPage'));

function App() {
    const { token } = useContext(AuthContext);
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Router>
                {token ? <MainPage path="/*" /> : <LoginPage path="/login" />}
                <NotFound default />
            </Router>
        </Suspense>
    );
}

export default App;
