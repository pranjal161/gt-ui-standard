import { AddBoxIcon, AddFolderIcon, PaymentIcon } from 'assets/svg';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import Button from 'components/Button/Button';
import ComplexTable from 'components/ComplexTable/ComplexTable';
import { DxcSelect } from '@dxc-technology/halstack-react';
import ManagementSelection from './ManagementSelection/ManagementSelection';
import Rate from 'components/Rate/Rate';
import React from 'react';
import Section from 'components/Section/Section';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';

interface SplitPoolInterface {
    hRef: string,
    data: any
}

export const MainSplitPool = (props: SplitPoolInterface) => {
    const [poolResponse] = useResponse(props.hRef);
    const headers = [
        { title: 'Funds' },
        { title: 'Pending funds' },
        { title: 'Rate' }
    ];
    const columns = [
        { valueKey: 'coverage_fund:label' },
        { valueKey: 'no' },
        { valueKey: 'allocation:rate', component: Rate }
    ];
    const rowExtraData = { hRefKey: 'allocation:coverage_fund' };
    const tableData = props.data.filter((funds: any) => funds['parent_product_component'] === props.hRef);

    return (
        <>
            {poolResponse && poolResponse.data && <AccordionContainer title={poolResponse.data['coverage_fund:label']} prefixActions={<AddFolderIcon />} actions={
                <div className={'d-flex'}>
                    <label>Rate</label><Rate property={''} response={[]} />
                </div>}>

                <ComplexTable selectionMode="none"
                    columns={columns} 
                    rowExtraData={rowExtraData}
                    headers={headers}
                    data={tableData} />
    
            </AccordionContainer>}
        </>
    );
}
export interface InvestmentSplitProps {

    /**
     * API response of API for the entity
     */
    response: any
}
const InvestmentSplit: React.FC<InvestmentSplitProps> = (props: { response: any }) => {
    const [isOpen, setOpen]: [boolean, Function] = React.useState(false);
    // To be picked from API after property allocation_type is available, harcoded for now
    const allocationTypes = [{ value: 'by_rate', label: 'Free allocation by rate' }];
    
    const { baId } = useConfigurations();
    const contractUrl = baId && baId.split('/operations')[0];
    
    console.log(isOpen);
    const poolSplit = props.response.data['main_pool_split'];

    return (
        <div className="col-12 mb-4">
            <Section title="Investment Split" icon={<PaymentIcon />} >
                <DxcSelect
                    options={allocationTypes}
                    label="Allocation type"
                    value="by_rate"
                />
                <div style={{ float: 'right' }}>
                    <Button onClick={() => setOpen(true)} Icon={AddBoxIcon}
                        title="Management Selection" />
                </div>
                <ManagementSelection open={isOpen}
                    onCancel={() => setOpen(false)}
                    contractUrl={contractUrl}
                />
            </Section>
            
            {poolSplit && poolSplit.map((pool: any, index: number) => <MainSplitPool key={index} data={props.response.data['investment_split']} hRef={pool['product_component']} />)}
            
        </div>
    )
}

export default InvestmentSplit;
