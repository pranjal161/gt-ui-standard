import React from 'react';

export interface InformationSheetProps{

    /**
     * hRef of the entity to get information
     */
    hRef:string
}
const InformationSheet:React.FC<InformationSheetProps> = ({hRef}:InformationSheetProps) => (
    <div>InformationSheet for hRef:{hRef}</div>
)

export default InformationSheet;
