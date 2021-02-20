import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import eventData from '../../assets/mocks/EventData';
import {GET_EVENTS, LOGIN_USER} from './Paths';

const instance = axios.create({
  baseURL: 'https://fakeapi.com',
});
const mock = new MockAdapter(instance, {delayResponse: 1000});

mock.onGet(GET_EVENTS).reply(200, eventData);
export default instance;

mock.onGet(LOGIN_USER).reply((config) => {
  return [200, {name: config.params.name}];
});
