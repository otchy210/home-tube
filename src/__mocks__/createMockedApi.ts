import { Api } from '../utils/Api';

const createMockedApi = () => {
    const api = new Api('http://dummy-api-host');
    jest.spyOn(api, 'getAppConfig');
    jest.spyOn(api, 'getSnapshotUrl');
    jest.spyOn(api, 'getServerStatus');
    return api;
};

export default createMockedApi;
