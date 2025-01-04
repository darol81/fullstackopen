import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

const Notification = () => 
{
    const data = useSelector(state => state.notification);   
    if (data === null) return null;
    return  (
                <div className={data.type}>
                    {data.message}
                </div>
            );
};

Notification.propTypes = 
{
    data: PropTypes.shape(
    {
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    })
}

export default Notification