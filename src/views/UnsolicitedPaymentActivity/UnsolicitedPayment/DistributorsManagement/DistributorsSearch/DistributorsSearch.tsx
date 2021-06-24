import DistributorsSearchContent, { foundDistributor } from './components/DisttributorsSearchContent/DistributorsSearchContent';

import Dialog from 'theme/components/material/Dialog/Dialog';
import DistributorsSearchActions from './components/DistributorsSearchActions/DistributorsSearchActions';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DistributorsSearchProps {
    open: boolean,
    onValidate?: Function,
    onCancel?: Function
}

type distributorSearch = {
    search: string,
    result: foundDistributor
}

const DistributorsSearch = ({open, onValidate, onCancel}: DistributorsSearchProps) => {
    const {t} = useTranslation();
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [obj, setObj] = React.useState<distributorSearch>({search: '', result: {rate: 0, distributor: {}}});

    return (
        <>
            <Dialog fullWidth={false}
                title={t('add_distributor')}
                open={open}
                content={<DistributorsSearchContent isSearching={isSearching} setValue={setObj} onChange={(obj: distributorSearch) => setObj({...obj})} />}
                actions={<DistributorsSearchActions search={obj.search} isSearching={isSearching} onSearch={() => setIsSearching(true)} onValidate={() => (onValidate ? onValidate(obj.result) : undefined)} onCancel={onCancel} />}
            />
        </>
    )
}

export default DistributorsSearch;