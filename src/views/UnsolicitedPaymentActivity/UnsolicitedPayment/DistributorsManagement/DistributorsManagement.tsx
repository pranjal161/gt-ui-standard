import { ContactsIcon, SquaredAddIcon } from 'assets/svg';

import DistributorsSearch from './DistributorsSearch/DistributorsSearch';
import {DxcButton} from '@dxc-technology/halstack-react';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import { distributorManagementColumns } from './distributorColumns';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from 'react-i18next';

// interface DistributorsManagementProps {

// }

const DistributorsManagement = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const url = '';
    // const url = 'http://20.33.40.147:13111/csc/insurance/distributors';
    
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [distributors, setDistributors] = React.useState<Array<any>>([]);

    const manageDistributors = (dist: any) => {
        console.log(dist);
        const arr = distributors;
        arr.push({...dist});
        setDistributors(arr);
        setIsVisible(false);
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.rowTitle}>
                    <div className={classes.title}>
                        <div className={classes.icon}>
                            <ContactsIcon />
                        </div>
                        <Typo variant="title" value={t('distributor_management')} />
                    </div>

                    <div className={classes.actions}>
                        <DxcButton iconPosition="after" label={t('add')} icon={<SquaredAddIcon size={24}/>} onClick={() => setIsVisible(true)} />
                    </div>
                </div>
                <div className={classes.divider} />
                <div className={classes.table}>
                    <Table url={url} columnId={distributorManagementColumns} itemsByPage={10}/>
                </div>

                <div className={classes.divider} />

                <div>
                    <p>Distributors : [{distributors.length}]</p>
                    <ul>
                        {
                            distributors.map((dist: any, index: number) => (
                                <li key={index}>{dist.distributor.name} | {dist.rate}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <DistributorsSearch open={isVisible}
                onCancel={() => setIsVisible(false)}
                onValidate={(value: any) => manageDistributors({...value})}
            />
        </>
    )
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white'
    },
    rowTitle: {
        padding: '0 20px',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalTokens.__grey_7,
        borderRadius: 50,
        width: 35,
        height: 35,
        marginRight: 16
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    actions: {
        '& .MuiButtonBase-root.MuiButton-root.MuiButton-text': {
            '& .FwHvz': {
                marginTop: 1,
                marginLeft: '4px !important',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    },
    table: {
        padding: '0 20px',
        paddingBottom: 32,
    },
    divider: {
        marginBottom: 20,
        height: 2,
        border: `1px solid ${globalTokens.__grey_6}`
    }
});

export default DistributorsManagement;
