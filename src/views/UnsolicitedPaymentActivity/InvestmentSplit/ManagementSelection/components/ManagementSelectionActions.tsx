import { DxcButton } from '@dxc-technology/halstack-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ManagementSelectionActions = ({ onCancel, onValidate}: any) => {

    const {t} = useTranslation();

    return (
        <>
            <DxcButton mode="text" label={t('cancel')} onClick={() => (onCancel ? onCancel() : undefined)} />
            <DxcButton label={t('ADD_MANAGEMENT')} onClick={() => (onValidate ? onValidate() : undefined)} />
        </>
    )
}

export default ManagementSelectionActions;