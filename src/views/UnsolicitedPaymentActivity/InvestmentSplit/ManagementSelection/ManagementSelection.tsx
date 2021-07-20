import Dialog from 'theme/components/material/Dialog/Dialog';
import ManagementSelectionActions from './components/ManagementSelectionActions';
import ManagementSelectionContent from './components/ManagementSelectionContent';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ManagementSelection = ({ open, onCancel, contractUrl} :any) => {
    const {t} = useTranslation();         

    return (
        <>
            <Dialog fullWidth={false}
                title={t('_MANAGEMENT_SELECTION')}
                open={open}
                content={<ManagementSelectionContent contractUrl={contractUrl} />}
                actions={<ManagementSelectionActions onCancel={onCancel} />}
            />
        </>
    )
}

export default ManagementSelection;