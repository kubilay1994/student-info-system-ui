import { useCallback, useState, useContext, useEffect, useRef } from 'react';

import { StoreContext } from './context';

export const useSelector = (selector, equalityFn = strictEqual) => {
    const store = useContext(StoreContext);
    const [, setState] = useState(null);
    const latestSelectedState = useRef(null);
    const currSelector = useRef(null);

    let selectedState;

    if (selector !== currSelector.selector) {
        selectedState = selector(store.state);
    } else {
        selectedState = latestSelectedState.current;
    }

    const listener = useCallback(() => {
        const newMappedState = currSelector.current(store.state);
        if (!equalityFn(newMappedState, latestSelectedState.current)) {
            latestSelectedState.current = newMappedState;
            setState(latestSelectedState.current);
        }
    }, [store, equalityFn]);

    useEffect(() => {
        currSelector.current = selector;
        latestSelectedState.current = selectedState;
    });

    useEffect(() => {
        store.listeners.push(listener);
        return () => {
            store.listeners = store.listeners.filter(li => li !== listener);
        };
    }, [store, listener]);

    return selectedState;
};

export const useDispatch = () => {
    const store = useContext(StoreContext);

    return function dispatch(action) {
        if (typeof action === 'function') {
            return action(dispatch, store.state);
        }
        store.dispatch(action);
    };
};

const strictEqual = (a, b) => a === b;
