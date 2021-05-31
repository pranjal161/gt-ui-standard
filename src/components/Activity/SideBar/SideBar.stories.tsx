import { Meta } from '@storybook/react';
import React from 'react';
import SideBar from 'components/Activity/SideBar/SideBar';

export default {
    title: 'Example/SideBar',
    component: SideBar,
} as Meta;

export const Normal = () => <SideBar value={0}/>
export const ShowContract = () => <SideBar value={2}/>
export const ShowClient = () => <SideBar value={2}/>
export const OpenInNewWindow = () => <SideBar value={2}/>
export const OpenInNewTab = () => <SideBar value={2}/>
export const Expand = () => <SideBar value={2}/>
export const Closed = () => <SideBar value={2}/>
