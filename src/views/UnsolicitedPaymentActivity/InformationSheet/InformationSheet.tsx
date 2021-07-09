import useResponse from 'hooks/useResponse';
import React from 'react';
import {getLink} from 'utils/functions';
import OperationInfoSheets
    from 'views/UnsolicitedPaymentActivity/InformationSheet/OperationInfoSheets/OperationInfoSheets';

export interface InformationSheetProps {

    /**
     * hRef of the activity
     */
    hRef: string
}

const InformationSheet: React.FC<InformationSheetProps> = ({hRef}: InformationSheetProps) => {
    const [response] = useResponse(hRef)
    const infoSheetHRef = response && getLink(response.data, 'operation:info_sheet_operation_list')

    return (
        <OperationInfoSheets hRef={infoSheetHRef}></OperationInfoSheets>
    )
}

export default InformationSheet;
