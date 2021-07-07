import React from 'react';

export interface InformationSheetProps{

    /**
     * API response of API for the entity
     */
    response:any

    /**
     * hRef of the activity
     */
    hRef : string
}
const InformationSheet:React.FC<InformationSheetProps> = ({response}:InformationSheetProps) => (
    <div>InformationSheet coming soon</div>
)

export default InformationSheet;
