import LabelInLine, {LabelInlineProps} from 'components/LabelInline/LabelInline';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/LabelInLine',
    component: LabelInLine,
    decorators: [(story) => <div style={{flex: '1 1 auto', height: '600px'}}>{story()}</div>],
} as Meta;

const Template: Story<LabelInlineProps> = (args) => <LabelInLine {...args} />;

export const Default = Template.bind({});
Default.args = {
    property:'test le mike',
    loading:true
};

