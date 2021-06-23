import mock from 'utils/mockAxios';
import {mockData} from 'assets/staticData/mockData';

mock.onAny().reply((config: any) => ([200, mockData[config.url || 0]]))
