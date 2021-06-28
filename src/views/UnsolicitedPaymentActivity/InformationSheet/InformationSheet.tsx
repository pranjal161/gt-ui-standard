import React from 'react';

export interface InformationSheetProps{

    /**
     * API response of API for the entity
     */
    response:any

}
const InformationSheet:React.FC<InformationSheetProps> = ({response}:InformationSheetProps) => (
    <div>InformationSheet coming soon</div>
)

export default InformationSheet;
