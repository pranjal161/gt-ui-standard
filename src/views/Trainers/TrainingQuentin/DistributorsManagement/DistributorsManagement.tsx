import { ContactsIcon, SquaredAddIcon } from 'assets/svg';

import {DxcButton} from '@dxc-technology/halstack-react';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import { distributorColumns } from './distributorColumns';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';

// import { useTranslation } from 'react-i18next';

// interface DistributorsManagementProps {

// }

const DistributorsManagement = ({}) => {
    // const {t} = useTranslation();
    const classes = useStyles();
    const url = 'http://20.33.40.147:13111/csc/insurance/distributors';

    return (
        <div className={classes.root}>
            <div className={classes.rowTitle}>
                <div className={classes.title}>
                    <div className={classes.icon}>
                        <ContactsIcon />
                    </div>
                    <Typo variant="title" value="Distributor Management" />
                </div>

                <div className={classes.actions}>
                    <DxcButton iconPosition="after" label="ADD" icon={<SquaredAddIcon size={24}/>} />
                </div>
            </div>
            <div className={classes.divider} />
            <div className={classes.table}>
                <Table url={url} columnId={distributorColumns} itemsByPage={10}/>
            </div>
        </div>
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
