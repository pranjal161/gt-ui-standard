import mock from 'utils/mockAxios';
import {mockData} from 'assets/staticData/mockData';

mock.onAny().reply((config) => ([200, mockData[config.url || 0]]))
