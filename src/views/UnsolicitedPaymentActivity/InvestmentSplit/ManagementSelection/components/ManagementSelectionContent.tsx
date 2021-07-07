import { getCollectionItems, getLink, getMainRisk } from 'utils/functions';

import React from 'react';
import SavingPool from './SavingPool';
import useResponse from 'hooks/useResponse';

const ManagementSelectionContent = (props: { contractUrl: string }) => {
    const { contractUrl } = props;
    const [contractResponse] = useResponse(contractUrl);
    const risks = contractResponse && getLink(contractResponse.data, 'contract:membership_list');
    const [riskResponse] = useResponse(risks);
    let savingsPoolProductList;

    const MainRisk = riskResponse && getMainRisk(riskResponse.data) && getMainRisk(riskResponse.data)[0].href;
    const [MainRiskRes] = useResponse(MainRisk);
    // need to change, to be picked directly from operation & not filtered from contract
    const productComponentListHRef = MainRiskRes && getLink(MainRiskRes.data, 'cscaia:product_component_list')

    const [productComponentListResponse] = useResponse(productComponentListHRef);
    if (productComponentListResponse) {
        const list = getCollectionItems(productComponentListResponse);

        savingsPoolProductList = list
            .filter((element: { summary: { [x: string]: string } }) => (
                element.summary &&
                element.summary['coverage_fund:type_variant'] === 'savings_pool'
            )).map((item: any) => <SavingPool key={item.href} hRef={item.href}></SavingPool>);
    }
    
    return (
        <div className="m-1">
            {savingsPoolProductList}
        </div>
    )
}

export default ManagementSelectionContent;