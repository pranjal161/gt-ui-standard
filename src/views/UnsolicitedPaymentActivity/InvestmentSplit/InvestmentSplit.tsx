import React from 'react';

export interface InvestmentSplitProps{

    /**
     * hRef of the entity to get information
     */
    hRef:string
}
const InvestmentSplit:React.FC<InvestmentSplitProps> = ({hRef}:InvestmentSplitProps) => (
    <div>InvestmentSplit for hRef:{hRef}</div>
)

export default InvestmentSplit;
