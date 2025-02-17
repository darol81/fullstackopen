import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/* Redux stuff */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import authenticationReducer from './reducers/authenticationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore
({
    reducer: 
    {
        blog: blogReducer,  
        notification: notificationReducer,
        authentication: authenticationReducer,
        user: userReducer
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);