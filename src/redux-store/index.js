/**
 * Example: https://github.com/the-road-to-learn-react/react-redux-example
 * localStorage: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
 */

import {createStore} from 'redux';
import rootReducer from './reducers';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState({...store.getState()});
});

export default store;