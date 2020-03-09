import React from 'react';

const ProductContext = React.createContext();

const Provider = ProductContext.Provider;
const Consumer = ProductContext.Consumer;

export {Provider,Consumer};