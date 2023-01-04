import {store} from 'app/store';

const getDataStore = (params) => {
  let dataStore = store.getState();
  if (params?.includes?.('.')) {
    const listParams = params.split('.');
    listParams?.length > 0 &&
      listParams?.forEach((name) => {
        dataStore = dataStore[name];
      });

    return dataStore;
  } else return dataStore[params];
};

export {getDataStore};
