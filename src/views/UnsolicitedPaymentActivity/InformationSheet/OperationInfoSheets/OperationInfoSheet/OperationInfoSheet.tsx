/* eslint-disable */
import {makeStyles} from '@material-ui/core/styles';
import Label from 'components/Label/Label';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import useResponse from 'hooks/useResponse';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flex: '1 0 auto',
        height: '100%',
        width: '100%',
    },
    subSection: {
        marginBlock: theme.spacing(1)
    },
    subSectionTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        textAlign: 'right',
        marginBlock: theme.spacing(3)
    },
    subSectionContent: {
        marginLeft: theme.spacing(2)
    },
}))

export interface OperationInfoSheetProps {

    /**
     * hRef on an operation_info_sheets/UUID
     */
    hRef: string

}

/**
 * Display an OperationInfoSheet
 * @param {OperationInfoSheetsProps} hRef as a operation info sheet
 * @return {React.Component} its detail
 */
const OperationInfoSheet: React.FC<OperationInfoSheetProps> = ({hRef}: OperationInfoSheetProps) => {
    const [response] = useResponse(hRef)
    console.log('response', response)
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.subSection}>
                <div className={classes.subSectionTitle}>
                    General information
                </div>
                <div className={classes.subSectionContent}>
                    {response &&
                    <div className="row">
                        <div className="col-4">
                            <Label
                                data={response.data}
                                property="info_sheet_operation:operation_type"
                            />
                        </div>
                        <div className="col-4">
                            <Label
                                data={response.data}
                                property="info_sheet_operation:operation_amount"
                            />
                        </div>
                        <div className="col-4">
                        </div>
                    </div>}
                </div>
                <div className={classes.subSection}>
                    <div className={classes.subSectionTitle}>
                        Additional information
                    </div>
                    <div className={classes.subSectionContent}>
                        {response && JSON.stringify(response)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperationInfoSheet;
