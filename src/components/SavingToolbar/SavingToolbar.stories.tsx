import {Meta, Story} from '@storybook/react';
import SavingToolbar, {SavingToolbarProps} from 'components/SavingToolbar/SavingToolbar';
import React from 'react';

export default {
    title: 'Business Components/SavingToolbar',
    component: SavingToolbar,
} as Meta;

const Template: Story<SavingToolbarProps> = (args) => <SavingToolbar {...args} />;

export const Default = Template.bind({});
Default.args = {
};

