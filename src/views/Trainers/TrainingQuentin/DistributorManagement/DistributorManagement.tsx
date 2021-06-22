import Dialog from 'theme/components/material/Dialog/Dialog';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import { distributorColumn } from './distributorColumn';
import { useTranslation } from 'react-i18next';

interface DistributorManagementProps {

    /**
     * Define the visibility state of the dialog
     */
    open: boolean,
}

interface DistributorManagementContentProps {

}

const DistributorManagementContent = ({}: DistributorManagementContentProps) => {
    const {t} = useTranslation();

    return (
        <>
            <Typo variant="title" value={t('common:distributor_management')} />
            <Table url="" columnId={distributorColumn} showPaginator={false} />
        </>
    )
}

const DistributorManagement = ({open}: DistributorManagementProps) => {
    const [value, setValue] = React.useState<any>();

    return (
        <>
            <Dialog fullWidth={true}
                open={open}
                content={<DistributorManagementContent/>}
            />
        </>
    )
}

export default DistributorManagement;