import { DxcButton } from '@dxc-technology/halstack-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DistributorsSearchActionsProps {
    data: any,
    isSearching: boolean,
    onCancel?: Function,
    onSearch?: Function,
    onValidate?: Function
}

const DistributorsSearchActions = ({data, isSearching, onCancel, onSearch, onValidate}: DistributorsSearchActionsProps) => {
    const {t} = useTranslation();
    
    return (
        <>
            <DxcButton mode="text" label={t('cancel')} onClick={() => (onCancel ? onCancel() : undefined)} />
            {
                isSearching ? <DxcButton label={t('validate')} disabled={Object.keys(data.result.distributor).length === 0} onClick={() => (onValidate ? onValidate() : undefined)} />
                    : <DxcButton label={t('search')} disabled={data.search === ''} onClick={() => (onSearch ? onSearch() : undefined)} />
            }
        </>
    )
}

export default DistributorsSearchActions;