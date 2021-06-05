import PanelSection, {PanelSectionProps} from 'components/PanelSection/PanelSection';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/PanelSectionItem',
    component: PanelSection,
} as Meta;

const Template: Story<PanelSectionProps> = (args) => <PanelSection {...args} />;

export const Default = Template.bind({});
Default.args = {
    title:'Hello world'
};

