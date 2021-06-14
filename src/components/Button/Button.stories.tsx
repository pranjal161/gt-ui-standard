import Button, {ButtonProps} from 'components/Button/Button';
import {Meta, Story} from '@storybook/react';

import {AddBoxIcon} from 'assets/svg';
import React from 'react';

export default {
    title: 'Components/Inputs/Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Add a fund',
    Icon : AddBoxIcon,
    onClick : () => console.log('click')
};

export const Disable = Template.bind({});
Disable.args = {
    title: 'Add a fund',
    disabled : true,
    Icon : AddBoxIcon,
    onClick : () => console.log('click')
};

export const IconOnly = Template.bind({});
IconOnly.args = {
    Icon : AddBoxIcon,
    onClick : () => console.log('click')
};

export const SecondaryIconOnly = Template.bind({});
SecondaryIconOnly.args = {
    Icon : AddBoxIcon,
    mode: 'secondary'
};

export const TextIconOnly = Template.bind({});
TextIconOnly.args = {
    Icon : AddBoxIcon,
    mode: 'text'
};
