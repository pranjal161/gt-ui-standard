/* eslint-disable */
import {ContractIcon, PersonSmallIcon} from 'assets/svg';
import React from 'react';
import VerticalToolbar from 'components/VerticalToolBar/VerticalToolbar';

const items = [
    {value: 'contract', display: <ContractIcon size={18}/>},
    {value: 'person', display: <PersonSmallIcon size={18}/>}]

/**
 * Saving tool bar for preview panels of Side bar
 */
export interface SavingToolbarProps {

    /**
     * Current value
     */
    value?: string

    /**
     * on change callback
     */
    onChange?: (value: any) => void
}
const SavingToolbar: React.FC<SavingToolbarProps> = (
    {value, onChange}: SavingToolbarProps) => (<VerticalToolbar items={items} value={value} onChange={onChange}/>)


export default SavingToolbar;
