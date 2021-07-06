import {AddBoxIcon, AddFolderIcon, PaymentIcon} from 'assets/svg';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import BindToStep from 'components/BindToStep/BindToStep';
import Button from 'components/Button/Button';
import ComplexTable from 'components/ComplexTable/ComplexTable';
import {DxcSelect} from '@dxc-technology/halstack-react';
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
    const [poolResponse]: any = useResponse(props.hRef);
    const header = [
        {title: 'Funds'},
        {title: 'Pending funds'},
        {title: 'Rate'}
    ];
    const column = [
        {valueKey: 'coverage_fund:label'},
        {valueKey: 'no'},
        {valueKey: 'allocation:rate', component: Rate}
    ];
    const row = {hRefKey: 'allocation:coverage_fund'};
    const tableData = props.data.filter((funds: any) => funds['parent_product_component'] === props.hRef);

    const actions = <div className={'d-flex'}>
        <label>Rate</label><Rate hRef={props.hRef} propertyName={''} response={[]}/>
    </div>

    return (
        <>
            {poolResponse && poolResponse.data &&
            <AccordionContainer
                title={poolResponse.data['coverage_fund:label']}
                prefixActions={<AddFolderIcon/>}
                actions={actions}>

                <ComplexTable selection="multiple" tableColumn={column} tableRow={row} tableHeader={header}
                    tableData={tableData} showSelectionLength={true}/>

            </AccordionContainer>}
        </>
    );
}

export interface InvestmentSplitProps {

    /**
     * API response of API for the entity
     */
    response: any

    /**
     * hRef of the activity
     */
    hRef: string
}

const InvestmentSplit: React.FC<InvestmentSplitProps> = (props: { response: any, hRef: string }) => {
    const [isOpen, setOpen]: [boolean, Function] = React.useState(false);
    // To be picked from API after property allocation_type is available, harcoded for now
    const allocationTypes = [{value: 'by_rate', label: 'Free allocation by rate'}];

    const {baId} = useConfigurations();
    const contractUrl = baId && baId.split('/operations')[0];

    console.log(isOpen);
    const poolSplit = props.response.data['main_pool_split'];

    return (
        <div className="col-12 mb-4">
            <Section title="Investment Split" icon={<PaymentIcon/>}>
                <DxcSelect
                    options={allocationTypes}
                    label="Allocation type"
                    value="by_rate"
                />
                <div style={{float: 'right'}}>
                    <Button onClick={() => setOpen(true)} Icon={AddBoxIcon}
                        title="Management Selection"/>
                </div>
                <ManagementSelection open={isOpen}
                    onCancel={() => setOpen(false)}
                    contractUrl={contractUrl}
                />
                <BindToStep hRef={props.hRef} property={'main_pool_split'}/>
            </Section>

            {poolSplit && poolSplit.map((pool: any, index: number) => (
                <MainSplitPool
                    key={index}
                    data={props.response.data['investment_split']}
                    hRef={pool['product_component']}/>
            )
            )}

        </div>
    )
}

export default InvestmentSplit;
