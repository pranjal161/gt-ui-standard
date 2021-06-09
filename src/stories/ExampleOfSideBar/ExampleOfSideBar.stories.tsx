import ExampleOfSideBar, {ExampleOfSideBarProps} from 'stories/ExampleOfSideBar/ExampleOfSideBar';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Usage Exemples/ActivitySideBar',
    component: ExampleOfSideBar,
    decorators: [(story) => <div style={{flex: '1 1 auto', height: '600px'}}>{story()}</div>],
} as Meta;

const Template: Story<ExampleOfSideBarProps> = (args) => <ExampleOfSideBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    open:true
};

