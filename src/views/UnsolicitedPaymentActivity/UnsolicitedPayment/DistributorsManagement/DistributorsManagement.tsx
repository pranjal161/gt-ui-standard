// import { ContactsIcon, SquaredAddIcon } from 'assets/svg';

import ComplexTable from 'components/ComplexTable/ComplexTable';
import DistributorsSearch from '../DistributorsSearch/DistributorsSearch';
import Rate from 'components/Rate/Rate';
import React from 'react';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useResponse from 'hooks/useResponse';

const DistributorsManagement = (props: { hRef:string }) => {
    // const {t} = useTranslation();
    const classes = useStyles();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [distributors, setDistributors] = React.useState<Array<any>>([]);
    const [response] = useResponse(props.hRef);
    const manageDistributors = (dist: any) => {
        console.log(dist);
        const arr = distributors;
        arr.push({ ...dist });
        setDistributors(arr);
        setIsVisible(false);
    }
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
        { valueKey: 'start_date', list: true },
        { valueKey: 'end_date', list: true }
    ];

    const rowExtraData = { hRefKey: 'distributor', list: 'distributor_list' }

    return (
        <>
            <div className={classes.root}>
                {/* <div className={classes.rowTitle}>
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
                <div className={classes.divider} /> */}
                {response && <ComplexTable selectionMode="none"
                    columns={columns}
                    headers={headers}
                    rowExtraData={rowExtraData}
                    data={response.data} />}
            </div>

            <DistributorsSearch open={isVisible}
                onCancel={() => setIsVisible(false)}
                onValidate={(value: any) => manageDistributors({ ...value })}
            />
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
