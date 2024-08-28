import { useSelector } from 'react-redux'

const Notification = () => 
{
    const notification = useSelector(state => state.notification);
    const style = 
    {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    /* Ei renderöidä, jos notification on null */
    if(notification == null) return null;
    return  (
                <div style={style}>
                    {notification}
                </div>
            );
}

export default Notification