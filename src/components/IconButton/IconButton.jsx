import {IconButton as IconButtonMat} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display Icon as button
 * @param {props} props Contains onClick handle, children contains the icon to display
 * @returns {*} Render the icon Button
 */
const IconButton = ({onClick, children, color='primary', ...rest}) => (<IconButtonMat color={color} onClick={onClick} {...rest}>
    {children}
</IconButtonMat>);

IconButton.propTypes = {
    onClick: PropTypes.func,
    color: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired

};

export default IconButton;
