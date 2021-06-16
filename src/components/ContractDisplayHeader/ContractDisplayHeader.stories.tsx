import ContractDisplayHeader, { ContractDisplayHeaderProps } from 'components/ContractDisplayHeader/ContractDisplayHeader';
import { Meta, Story } from '@storybook/react';

import React from 'react';
import { contractOperations, } from 'assets/staticData/data';

export default {
    title: 'Components/Activity/ContractHeaderBar',
    component: ContractDisplayHeader,
} as Meta;

const Template: Story<ContractDisplayHeaderProps> = (args) => <ContractDisplayHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Contract number: ID12345678',
    response: contractOperations,
};

export const WrongResponseProps = Template.bind({});
WrongResponseProps.args = {
    response: 'empty',
};