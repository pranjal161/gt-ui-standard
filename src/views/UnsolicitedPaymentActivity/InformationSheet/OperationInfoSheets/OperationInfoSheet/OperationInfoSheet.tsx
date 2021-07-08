/* eslint-disable react/jsx-key */
import {makeStyles} from '@material-ui/core/styles';
import LabelInBlock from 'components/LabelInBlock/LabelInBlock';
import SelectInput from 'components/SelectInput/SelectInput';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import React, {useCallback} from 'react';
import {getLink} from 'utils/functions';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(3),
        alignItems: 'start',
        height: '100%',
        width: '100%',
    },
    subSection: {},
    subSectionTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        textAlign: 'left',
        //marginBlock: theme.spacing(3)
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
    const classes = useStyles()
    const [response] = useResponse(hRef)
    const payerHRef = response && getLink(response.data, 'info_sheet_operation:payer_person')

    const {patch} = useAia();

    const patchValue = (value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef, payload).then();
    }

    const RowProperties = useCallback(({value}: any) => (
        <div className="row mt-4 mb-4">
            {value.map((component: any, index: number) => <div key={index} className="col-4">
                {component}
            </div>)}
        </div>), [])

    return (
        <div className={classes.root}>
            <div className={classes.subSection}>
                <div className={classes.subSectionTitle}>
                    General information
                </div>
                <div className={classes.subSectionContent}>
                    <RowProperties value={[
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:operation_type'}/>,
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:operation_amount'}
                            styleType={['currency']}/>,
                        <LabelInBlock hRef={payerHRef} property={'person:display_id1'} context={'payer'}/>,
                    ]}/>
                    <RowProperties value={[
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:start_date'}
                            styleType={['date']}/>,
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:operation_amount'}
                            styleType={['currency']}/>,
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:tax_type_class'}/>,
                    ]}/>
                    <RowProperties value={[
                        <LabelInBlock hRef={hRef} property={'info_sheet_operation:operation_date'}
                            styleType={['date']}/>
                    ]}/>
                </div>
                <div className={classes.subSection}>
                    <div className={classes.subSectionTitle}>
                        Additional information
                    </div>
                    <div className={classes.subSectionContent}>
                        {response &&
                        <>
                            <RowProperties value={[
                                <SelectInput
                                    hRef={hRef}
                                    propertyName={'info_sheet_operation:fund_origin'}
                                    data={response.data}
                                    onChangeMethod={(value: any) => patchValue(value, 'info_sheet_operation:fund_origin')}/>,
                            ]}/>
                            <RowProperties value={[
                                <SelectInput
                                    hRef={hRef}
                                    propertyName={'info_sheet_operation:consistent_operation'}
                                    data={response.data}
                                    onChangeMethod={(value: any) => patchValue(value, 'info_sheet_operation:consistent_operation')}/>,
                                <SelectInput
                                    hRef={hRef}
                                    propertyName={'info_sheet_operation:atypical_operation'}
                                    data={response.data}
                                    onChangeMethod={(value: any) => patchValue(value, 'info_sheet_operation:atypical_operation')}/>,
                                <SelectInput
                                    hRef={hRef}
                                    propertyName={'info_sheet_operation:operation_motive'}
                                    data={response.data}
                                    onChangeMethod={(value: any) => patchValue(value, 'info_sheet_operation:operation_motive')}/>,
                            ]}/>
                        </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OperationInfoSheet);
