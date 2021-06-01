import {Meta, Story} from '@storybook/react';
import Section, {SectionProps} from './Section';
import React from 'react';

export default {
    title: 'Components/Surfaces/Section',
    component: Section,
} as Meta;

const Template: Story<SectionProps> = (args) => <Section {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};

export const WithActions = Template.bind({});
WithActions.args = {
};
