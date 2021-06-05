import SavingToolbar, {SavingToolbarProps} from 'components/SavingToolbar/SavingToolbar';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/SavingToolbar',
    component: SavingToolbar,
} as Meta;

const Template: Story<SavingToolbarProps> = (args) => <SavingToolbar {...args} />;

export const Default = Template.bind({});
Default.args = {
};

