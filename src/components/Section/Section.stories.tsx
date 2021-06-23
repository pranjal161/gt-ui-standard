import {Meta, Story} from '@storybook/react';
import Section, {SectionProps} from './Section';

import { AddBoxIcon } from 'assets/svg';
import Button from 'components/Button/Button';
import React from 'react';

export default {
    title: 'Components/Surfaces/Section',
    component: Section,
} as Meta;

const Template: Story<SectionProps> = (args:any) => <Section {...args} />;
const actions = [<Button key={1} Icon={AddBoxIcon}title="Test Button1"/>,<Button key={1} Icon={AddBoxIcon}title="Test Button2"/>]

export const Default = Template.bind({});
Default.args = {
    title:'General Information' 
};

export const WithActions = Template.bind({});
WithActions.args = {
    title:'General Information' ,
    actions:actions
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    title:'General Information',
    icon:<AddBoxIcon/>
}