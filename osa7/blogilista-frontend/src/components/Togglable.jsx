import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

/* Css */
import { AppContainer, Button } from '../components/styles/styledComponents';

const Togglable = forwardRef((props, ref) => 
{
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => 
    {
        setVisible(!visible);
    }

    useImperativeHandle(ref, () => 
    {
        return { toggleVisibility }
    });

    return (
            <AppContainer>
                <div style={hideWhenVisible}>
                    <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
                </div>
                <div style={showWhenVisible}>
                    {props.children}
                    <Button onClick={toggleVisibility}>Hide</Button>
                </div>
            </AppContainer>  
            );
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = 
{
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node
}


export default Togglable