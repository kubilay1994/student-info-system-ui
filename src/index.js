import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AuthProvider } from './context/auth-context';

import { Provider, createStore, combineReducers } from './store';
import courseReducer from './store/reducers/course';
import classroomReducer from './store/reducers/classroom';
import sectionRecuder from './store/reducers/section';

const store = createStore(
    combineReducers({
        course: courseReducer,
        classroom: classroomReducer,
        section: sectionRecuder
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
