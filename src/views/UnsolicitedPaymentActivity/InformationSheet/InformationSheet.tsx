import LinkedClient from './OperationInfoSheets/LinkedClient';
import OperationInfoSheets
    from 'views/UnsolicitedPaymentActivity/InformationSheet/OperationInfoSheets/OperationInfoSheets';
import React from 'react';
import {getLink} from 'utils/functions';
import useResponse from 'hooks/useResponse';

export interface InformationSheetProps {

    /**
     * hRef of the activity
     */
    hRef: string
}

const InformationSheet: React.FC<InformationSheetProps> = ({hRef}: InformationSheetProps) => {
    const [response] = useResponse(hRef)
    const infoSheetHRef = response && getLink(response.data, 'operation:info_sheet_operation_list');
    // API not ready yet,for now: to show only payer info 
    const payer = response && getLink(response.data, 'premium:addressee_person') ? getLink(response.data, 'premium:addressee_person') :
        getLink(response.data, 'premium:addressee_organization');

    return (
        <>
            <LinkedClient hRef={payer} />
            <OperationInfoSheets hRef={infoSheetHRef}></OperationInfoSheets>
        </>
    )
}

export default InformationSheet;
