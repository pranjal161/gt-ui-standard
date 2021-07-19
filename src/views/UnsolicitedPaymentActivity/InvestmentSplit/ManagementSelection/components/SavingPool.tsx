import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import { DxcCheckbox } from '@dxc-technology/halstack-react'
import FundsTable from './FundsTable';
import React from 'react';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const SavingPool = ({ hRef }: any) => {
    const [response] = useResponse(hRef);
    const investmentFundsHRef = response && getLink(response.data, 'savings_pool:coverage_fund_list');
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <>
            {response &&
                <div className="mt-2">
                    <AccordionContainer title={response.data['coverage_fund:label']}
                        prefixActions={<DxcCheckbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />}>
                        {investmentFundsHRef && <FundsTable investmentFundsHRef={investmentFundsHRef} />}
                    </AccordionContainer>
                </div>
            }
        </>
    )
};
export default SavingPool;

