import {createStore} from 'redux';
import {combineReducers} from 'redux';
import characterReducer from './reducers/characters';

const reducers = {
    characterReducer
}

const combined = combineReducers({
    characters: characterReducer
})

const store = createStore(combined);

export default store;