import { createContext } from 'react';
import { Api } from './Api';

const ApiContext = createContext<Api>(new Api());

export default ApiContext;
