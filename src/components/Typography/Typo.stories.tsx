import {Meta, Story} from '@storybook/react';
import Typo, {TypoProps} from 'components/Typography/Typo';
import React from 'react';

export default {
    title: 'Typography/Base elements',
    component: Typo,
} as Meta;

const Template: Story<TypoProps> = (args) => <Typo {...args} />;

export const Default = Template.bind({});
Default.args = {
    variant:'titleSection',
    value: 'My text here',
};

export const TitleSection = () => <Typo variant={'titleSection'} value={'Title section'} />;
export const SubTitleSection = () => <Typo variant={'subTitleSection'} value={'Sub title section'} />;
export const Body = () => <Typo variant={'body'} value={'Body text ...'} />;
export const SecondaryBody = () => <Typo variant={'secondaryBody'} value={'Secondary body'} />;
export const Link = () => <Typo variant={'link'} value={'Link'} />;
export const Tab = () => <Typo variant={'tab'} value={'TAB'} />;
export const Placeholder = () => <Typo variant={'placeholder'} value={'Placeholder'} />;

