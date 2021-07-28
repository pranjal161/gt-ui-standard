import LinkedClient from './OperationInfoSheets/LinkedClient';
import OperationInfoSheets
    from 'views/UnsolicitedPaymentActivity/InformationSheet/OperationInfoSheets/OperationInfoSheets';
import React from 'react';
import {getLink} from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useResponse from 'hooks/useResponse';

export interface InformationSheetProps {

    /**
     * hRef of the activity
     */
    hRef: string
}

const InformationSheet: React.FC<InformationSheetProps> = ({hRef}: InformationSheetProps) => {
    const [response] = useResponse(hRef);
    const { activityProps } = useActivity();
    const { mainEntityHRef } = activityProps;
    const infoSheetHRef = response && getLink(response.data, 'operation:info_sheet_operation_list');

    return (
        <>
            <LinkedClient hRef={mainEntityHRef} inquiry="_inquiry=e_contract_parties_unsolicited_payment" />
            <OperationInfoSheets hRef={infoSheetHRef}></OperationInfoSheets>
        </>
    )
}

export default InformationSheet;
