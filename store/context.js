import React, { createContext } from 'react';

export const StoreContext = createContext();

export const Provider = ({ store, children }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);


