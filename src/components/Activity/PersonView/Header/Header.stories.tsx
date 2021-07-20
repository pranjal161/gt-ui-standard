import 'mocks/mockAxiosCalls'
import Header, {HeaderProps} from 'components/Activity/PersonView/Header/Header';
import {Meta, Story} from '@storybook/react';
import React from 'react';
import {WithReduxActivity} from 'utils/storyBooks';

export default {
    title: 'Components/Headers/For contract view',
    component: Header,
    decorators: [(Story: any) => <WithReduxActivity><Story/></WithReduxActivity>]
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
const onLaunchActivity = () => null;
Default.args = {
    title: 'Contract number: ID12345678910',
    hRef: 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHtW',
    onLaunchActivity: onLaunchActivity
};

export const NoResponseProps = Template.bind({});
NoResponseProps.args = {
    hRef: '',
};
