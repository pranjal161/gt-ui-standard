import AccordionContainer, { AccordionProps } from './AccordionContainer';
import {Meta, Story} from '@storybook/react';

import {AddBoxIcon} from 'assets/svg';
import Button from 'components/Button/Button';
import React from 'react';

export default {
    title: 'Components/Accordion',
    component: AccordionContainer,
} as Meta;

const Template: Story<AccordionProps> = (args) => <AccordionContainer {...args} />;
const actions = [<Button key={1} Icon={AddBoxIcon} title="Test Button1"/>]

export const Default = Template.bind({});
Default.args = {
    title: 'Free Management',
};

export const WithPrefixActions = Template.bind({});
WithPrefixActions.args = {
    title: 'Free Management',
    prefixActions: <AddBoxIcon />
};

export const WithActions = Template.bind({});
WithActions.args = {
    title: 'Free Management',
    actions: actions
};

export const WithAllActions = Template.bind({});
WithAllActions.args = {
    title: 'Free Management',
    prefixActions: <AddBoxIcon />,
    actions: actions
};
