import { DxcButton } from '@dxc-technology/halstack-react';
import React from 'react';
import { StyledIconButton } from './StyledIconButton';

/**
 * Display Icon as button
 * @param {props} props Contains onClick handle, children contains the icon to display
 * @returns {*} Render the icon Button
 */
const IconButton = (props: { onClick: Function, children: any }) => (<StyledIconButton>
    <DxcButton label={props.children} onClick={props.onClick} mode="text" />
</StyledIconButton>);

export default IconButton;
