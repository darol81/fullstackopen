import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer);

const App = () => 
{
    const action_button = (msg) => 
    {
        store.dispatch
        ({
            type: msg
        });
    }

    return  (
                <div>
                    <button onClick={() => action_button("GOOD")}>good</button> 
                    <button onClick={() => action_button("OK")}>ok</button> 
                    <button onClick={() => action_button("BAD")}>bad</button>
                    <button onClick={() => action_button("ZERO")}>reset stats</button>
                    <div>good {store.getState().good}</div>
                    <div>ok {store.getState().ok}</div>
                    <div>bad {store.getState().bad}</div>                
                </div>
            )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => 
{
    root.render(<App />);
}

renderApp();
store.subscribe(renderApp);
