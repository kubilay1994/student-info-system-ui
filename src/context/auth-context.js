import React from 'react';

const authContext =  React.createContext({
    token : null,
    login : () => {},
    singup : () => {},
});


export default authContext;