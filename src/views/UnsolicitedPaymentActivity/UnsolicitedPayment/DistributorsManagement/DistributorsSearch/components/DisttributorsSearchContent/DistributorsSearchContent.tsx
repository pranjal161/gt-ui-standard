import { DxcInput } from '@dxc-technology/halstack-react';
import React from 'react';
import { SearchIcon } from 'assets/svg';
import Table from 'components/Table/Table';
import { distributorSearchColumns } from '../../../distributorColumns';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from 'react-i18next';

interface DistributorsSearchContentProps {
    isSearching: boolean,
    setValue: Function,
    onChange: Function
}

export type foundDistributor = {
    rate: number | string,
    distributor: any
}

const DistributorsSearchContent = ({isSearching, setValue, onChange}: DistributorsSearchContentProps) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [search, setSearch] = React.useState<string>('');
    const [distributor, setDistributor] = React.useState<foundDistributor>({rate: 0, distributor: {}});
    const [url, setUrl] = React.useState<string>('');
    const baseUrl = 'http://20.33.40.147:13111/csc/insurance/distributors';

    const handleRateChange = (newValue: string) => {
        let value = +newValue;

        if (newValue.match('[0-9]{1,3}')){

            if (+newValue > 100) {
                value = 100;
            }
            else if (+newValue < 0 || newValue === '') {
                value = 0;
            }

            if (+newValue <= 100 && +newValue >= 0) {
                setDistributor({
                    ...distributor,
                    rate: value
                });
            }
        }
        else if (newValue === '') {
            setDistributor({
                ...distributor,
                rate: 0
            });
        }
    }

    const handleSearch = (newValue: string) => {
        setSearch(newValue.toUpperCase());
    }

    React.useEffect(() => {
        console.log({search});
        setUrl(`${baseUrl}?distributor_detail:identifier=${search}`);
    }, [search])

    React.useEffect(() => {
        setValue({...distributor});

        onChange({result: {...distributor}, search});
    }, [distributor, search])

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <DxcInput required value={search} placeholder="Ex: AP00000019" suffixIcon={<SearchIcon/>} label={t('search_distributor')} size="medium" onChange={handleSearch} />

                <div className={classes.rate}>
                    <DxcInput label={t('rate')} placeholder="Ex: 50" suffix="%" value={distributor['rate'].toString()} onChange={handleRateChange} />
                </div>
            </div>

            {
                isSearching && url !== '' &&
                    <Table url={url ? url : baseUrl}
                        itemsByPage={10}
                        columnId={distributorSearchColumns}
                        onRowSelected={(row: any) => setDistributor({...distributor, distributor: row})}
                    />
            }
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 40
    },
    
    rate: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100
    }
});

export default DistributorsSearchContent;