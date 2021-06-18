import AxiosMockAdapter from 'axios-mock-adapter';

import axios from './axios';

const mockAxios = new AxiosMockAdapter(axios, { delayResponse: 0 });

export default mockAxios;
