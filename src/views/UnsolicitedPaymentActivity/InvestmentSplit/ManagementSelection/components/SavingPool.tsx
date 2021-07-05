import { getLink, getTitle } from 'utils/functions';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import { DxcCheckbox } from '@dxc-technology/halstack-react'
import React from 'react';
import useResponse from 'hooks/useResponse';

const SavingPool = ({ hRef }: any) => {
    const [response] = useResponse(hRef);
    const title = response && getTitle(response.data);
    const investmentFundsHRef = response && getLink(response.data, 'savings_pool:coverage_fund_list');
    console.log(investmentFundsHRef);
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <>
            {response &&
                <div className="mt-2">
                    <AccordionContainer title={response.data['coverage_fund:label']}
                        prefixActions={<DxcCheckbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />}>
                        {title}
                    </AccordionContainer>
                </div>
            }
        </>
    )
}
;
export default SavingPool;

