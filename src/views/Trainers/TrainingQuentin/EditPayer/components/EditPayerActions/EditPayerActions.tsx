import { DxcButton } from '@dxc-technology/halstack-react'
import React from 'react';
import { useTranslation } from 'react-i18next';

interface EditPayerActionsProps {

    /**
     * Data passed to the action section.
     */
    filters: any,

    /**
     * Searching state to disable or display other actions while search is started.
     */
    isSearching: boolean,

    /**
     * Function called when clicking on Cancel button. 
     */
    onCancel: Function,

    /**
     * Function called when clicking on Modify button.
     */
    onModify: Function,

    /**
     * Function called when clicking on Search button.
     */
    onSearch: Function,

    /**
     * Function called when clicking on Create button
     */
    onCreate: Function
}

const EditPayerActions = ({filters = {}, isSearching, onCancel, onModify, onSearch, onCreate}: EditPayerActionsProps) => {
    
    const {t} = useTranslation();

    return (
        <>
            <DxcButton mode="text" label={t('common:cancel')} onClick={() => onCancel()} />
            <DxcButton mode="secondary" label={t('common:create')} disabled onClick={() => onCreate()} />

            {
                isSearching ? 
                    <DxcButton mode="primary" label={t('common:modify')} onClick={() => onModify()} /> 
                    : <DxcButton mode="primary" label={t('common:search')} onClick={() => onSearch()} disabled={Object.keys(filters).length === 0} />
            }
        </>
    )
};

export default EditPayerActions;