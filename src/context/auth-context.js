import React from 'react';

const authContext =  React.createContext({
    isAuth : false,
    token : null,
    login : () => {},
    singup : () => {},
});


export default authContext;