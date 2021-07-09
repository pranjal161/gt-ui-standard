// import { ContactsIcon, SquaredAddIcon } from 'assets/svg';

import ComplexTable from 'components/ComplexTable/ComplexTable';
import Rate from 'components/Rate/Rate';
import React from 'react';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useResponse from 'hooks/useResponse';

const DistributorsManagement = (props: { hRef:string }) => {
    // const {t} = useTranslation();
    const classes = useStyles();
    const [response] = useResponse(props.hRef);

    const headers = [
        { title: 'Distributor' },
        { title: 'Role'},
        { title: 'Rate' },
        { title: 'Start Date' },
        { title: 'End Date' },
    ];
    const columns = [
        { valueKey: 'distributor_detail:identifier', hRefKey: true },
        { valueKey: 'role', list: true },
        { valueKey: 'rate', component: Rate , list: true },
        { valueKey: 'start_date', list: true, format: 'date' },
        { valueKey: 'end_date', list: true, format: 'date' }
    ];

    const rowExtraData = { hRefKey: 'distributor', list: 'distributor_list' }

    return (
        <>
            <div className={classes.root}>
                {response && <ComplexTable selectionMode="none"
                    columns={columns}
                    headers={headers}
                    rowExtraData={rowExtraData}
                    data={response.data} />}
            </div>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white'
    },
    rowTitle: {
        // padding: '0 20px',
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
    divider: {
        marginBottom: 20,
        height: 2,
        border: `1px solid ${globalTokens.__grey_6}`
    }
});

export default DistributorsManagement;
