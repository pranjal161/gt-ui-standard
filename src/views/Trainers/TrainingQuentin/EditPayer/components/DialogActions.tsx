import { DxcButton } from '@dxc-technology/halstack-react'
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DialogActionsProps {
    data: any,
    isSearching: boolean,
    onCancel: Function,
    onModify: Function,
    onSearch: Function,
    onCreate: Function
}

const DialogActions = ({data = {}, isSearching, onCancel, onModify, onSearch, onCreate}: DialogActionsProps) => {
    const {t} = useTranslation();

    return (
        <>
            <DxcButton mode="text" label={t('common:cancel')} onClick={() => onCancel()} />
            <DxcButton mode="secondary" label={t('common:create')} onClick={() => onCreate()} />

            {
                isSearching ? 
                    <DxcButton mode="primary" label={t('common:modify')} onClick={() => onModify()} /> 
                    : <DxcButton mode="primary" label={t('common:search')} onClick={() => onSearch()} disabled={Object.keys(data.filters).length === 0} />
            }
        </>
    )
};

export default DialogActions;