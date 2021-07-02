import React from 'react';
import SavingPool from './SavingPool';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const ManagementSelectionContent = (props: { contractUrl: string }) => {
    const { contractUrl } = props;
    const [contractResponse] = useResponse(contractUrl);
    const risks = contractResponse && getLink(contractResponse.data, 'contract:membership_list');
    const [riskResponse] = useResponse(risks);
    let savingsPoolProductList;
    const getMainRisk = (riskResponse: any) => {
        if (riskResponse && riskResponse._links.item) {
            let result = JSON.parse(JSON.stringify(riskResponse));
            if (!Array.isArray(result['_links']['item'])) {
                result['_links']['item'] = [result['_links']['item']];
            }
            const mainRiskItem = result._links.item.filter(
                (item: { summary: { [x: string]: any } }) => (
                    item.summary['membership:main'] === true
                ),
            );
            if (mainRiskItem && mainRiskItem.length > 0) {
                return mainRiskItem[0].href;
            }
        }
    }

    const MainRisk = riskResponse && getMainRisk(riskResponse.data);
    const [MainRiskRes] = useResponse(MainRisk);
    const productComponentListHRef = MainRiskRes && getLink(MainRiskRes.data, 'cscaia:product_component_list')

    const [productComponentListResponse] = useResponse(productComponentListHRef);
    if (productComponentListResponse) {
        const res = JSON.parse(JSON.stringify(productComponentListResponse));
        if (res && res.data && res.data._links && res.data._links.item) {
            const list = Array.isArray(res.data._links.item)
                ? res.data._links.item
                : [res.data._links.item];

            savingsPoolProductList = list
                .filter((element: { summary: { [x: string]: string } }) => (
                    element.summary &&
                    element.summary['coverage_fund:type_variant'] === 'savings_pool'
                )).map((item: any) => <SavingPool key={item.href} hRef={item.href}></SavingPool>);
            console.log(savingsPoolProductList);

        }
    }
    
    return (
        <div className="m-1">
            {savingsPoolProductList}
        </div>
    )
}

export default ManagementSelectionContent;