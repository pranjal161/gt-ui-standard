import {DxcButton} from '@dxc-technology/halstack-react';
import React from 'react';

/**
 * Display Icon as button
 * @param {props} props Contains onClick handle, children contains the icon to display
 * @returns {*} Render the icon Button
 */
const IconButton = (props: { onClick: Function, children: any }) => (
    <DxcButton label={props.children} onClick={props.onClick} mode="text"/>);

export default IconButton;
