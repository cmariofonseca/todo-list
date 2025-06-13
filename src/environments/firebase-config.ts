import { initializeApp } from 'firebase/app';
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config';
import { environment } from './environment';

export const firebaseConfig = {
  apiKey: 'AIzaSyDzJ_3U7P9J3NqmMCQlv1Mq3nTIfQB_dPA',
  authDomain: 'todo-list-cf1d3.firebaseapp.com',
  projectId: 'todo-list-cf1d3',
  storageBucket: 'todo-list-cf1d3.firebasestorage.app',
  messagingSenderId: '233757211844',
  appId: '1:233757211844:web:a1bb9533c7fe366f62dd91',
};

const app = initializeApp(firebaseConfig);
export const remoteConfig: RemoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: environment.firebaseFetchInterval,
  fetchTimeoutMillis: environment.firebaseFetchTimeout,
};
