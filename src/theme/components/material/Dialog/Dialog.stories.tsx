import Dialog, {DialogProps} from 'theme/components/material/Dialog/Dialog';
import {Meta, Story} from '@storybook/react';
import Button from 'components/Button/Button';
import React from 'react';

export default {
    title: 'Components/Dialog',
    component: Dialog,
} as Meta;

const Template: Story<DialogProps> = (args) => <Dialog {...args} />;

const Content = <div style={{backgroundColor:'lightgrey'}}>Content</div>

export const Default = Template.bind({});
Default.args = {
    title: 'Hello world',
    maxWidth: 'sm',
    fullWidth: true,
    content:Content,
    open: true
};

const Buttons = [<Button key={1} title={'Cancel'} mode={'text'}/>,
    <Button key={2} title={'Create'} mode={'secondary'}/>,
    <Button key={3} title={'Search'} mode={'primary'}/>,]
export const WithActions = Template.bind({});
WithActions.args = {
    title: 'Hello world with actions buttons',
    maxWidth: 'md',
    fullWidth: true,
    open: true,
    content:Content,
    actions: Buttons
};

