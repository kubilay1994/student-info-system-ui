import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './context/auth-context';

import { Provider, createStore, combineReducers } from './store';
import depReducer from './store/reducers/department';
import courseReducer from './store/reducers/course';

const store = createStore(
    combineReducers({
        department: depReducer,
        course: courseReducer
    })
);

const StudentInfoApp = () => (
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
);
ReactDOM.render(<StudentInfoApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
