import React from 'react';

export interface InformationSheetProps{

    /**
     * API response of API for the entity
     */
    response:any

}
const InformationSheet:React.FC<InformationSheetProps> = ({response}:InformationSheetProps) => (
    <div>InformationSheet response: {JSON.stringify(response)}</div>
)

export default InformationSheet;
