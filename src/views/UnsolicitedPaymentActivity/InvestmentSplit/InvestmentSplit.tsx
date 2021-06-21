import React from 'react';

export interface InvestmentSplitProps{

    /**
     * API response of API for the entity
     */
    response:any
}
const InvestmentSplit:React.FC<InvestmentSplitProps> = ({response}:InvestmentSplitProps) => (
    <div>InformationSheet response: {JSON.stringify(response)}</div>
)

export default InvestmentSplit;
