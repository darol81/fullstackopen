import { useContext, createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) =>
{
    return action.payload;
}
// dispatch({ payload: "Hello" })

export const NotificationContextProvider = (props) => 
{
    const [notificationValue, notificationDispatch] = useReducer(notificationReducer, null);

    return  (
                <NotificationContext.Provider value={[notificationValue, notificationDispatch]}>
                    {props.children}
                </NotificationContext.Provider>
            )
}

export const useNotification = () =>
{
    return useContext(NotificationContext)[0];
}

export const useNotify = () => 
{
    const dispatch = useContext(NotificationContext)[1];
    const notify = (msg, expire = 5000) => 
    {
        dispatch({ payload: msg });
        setTimeout(() => 
        {
            dispatch({ payload: null });
        }, expire);
    }
    return notify;
}

export default NotificationContext;