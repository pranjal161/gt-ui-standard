import { DxcButton } from '@dxc-technology/halstack-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DistributorsSearchActionsProps {
    search: string,
    isSearching: boolean,
    onCancel?: Function,
    onSearch?: Function,
    onValidate?: Function
}

const DistributorsSearchActions = ({search, isSearching, onCancel, onSearch, onValidate}: DistributorsSearchActionsProps) => {

    const {t} = useTranslation();

    return (
        <>
            <DxcButton mode="text" label={t('cancel')} onClick={() => (onCancel ? onCancel() : undefined)} />
            {
                isSearching ? <DxcButton label={t('validate')} onClick={() => (onValidate ? onValidate() : undefined)} />
                    : <DxcButton label={t('search')} disabled={search === ''} onClick={() => (onSearch ? onSearch() : undefined)} />
            }
        </>
    )
}

export default DistributorsSearchActions;