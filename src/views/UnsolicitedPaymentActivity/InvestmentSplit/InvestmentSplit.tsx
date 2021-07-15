import {AddBoxIcon, AddFolderIcon, PaymentIcon} from 'assets/svg';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import {ActivityProps} from 'components/Activity/Activity';
import BindToStep from 'components/BindToStep/BindToStep';
import Button from 'components/Button/Button';
import ComplexTable from 'components/ComplexTable/ComplexTable';
import ManagementSelection from './ManagementSelection/ManagementSelection';
import Rate from 'components/Rate/Rate';
import React from 'react';
import Section from 'components/Section/Section';
import SelectInput from 'components/SelectInput/SelectInput';
import useActivity from 'hooks/useActivity';
import useResponse from 'hooks/useResponse';

interface SplitPoolInterface {
    hRef: string,
    data: any
}

export const MainSplitPool = (props: SplitPoolInterface) => {
    const [poolResponse] = useResponse(props.hRef);
    const headers = [
        { title: 'Funds' },
        { title: 'Rate' }
    ];
    const columns = [
        { valueKey: 'coverage_fund:label', hRefKey: true },
        { valueKey: 'allocation:rate', component: Rate, list: true }
    ];
    const rowExtraData = { hRefKey: 'allocation:coverage_fund', list: 'investment_split' };
    const tableData = props.data['investment_split'].filter((funds: any) => funds['parent_product_component'] === props.hRef);
    const tableResponse = {...props.data, investment_split: tableData }
    const actions = <div className={'d-flex'}>
        <label>Rate</label><Rate property={'to_be_define'} response={[]}/>
    </div>

    return (
        <>
            {poolResponse && poolResponse.data &&
                <AccordionContainer
                    title={poolResponse.data['coverage_fund:label']}
                    prefixActions={<AddFolderIcon/>}
                    actions={actions}>

                    <ComplexTable
                        columns={columns} 
                        rowExtraData={rowExtraData}
                        headers={headers}
                        data={tableResponse} />
    
                </AccordionContainer>}
        </>
    );
}

const InvestmentSplit: React.FC<ActivityProps> = ( props:{hRef:string}) => {
    const { hRef } = props
    const { activityProps } = useActivity()
    const { mainEntityHRef } = activityProps
    const [response] = useResponse(hRef)

    const [isOpen, setOpen]: [boolean, Function] = React.useState(false);

    const contractHRef = mainEntityHRef
    const poolSplit = response.data['main_pool_split'];

    return (
        <div className="col-12 mb-4">
            <Section title="Investment Split" icon={<PaymentIcon/>}>
                {/* API need to add oneOf instead of type string */}
                <SelectInput
                    property="allocation_type"
                    hRef={hRef} />
                <div style={{float: 'right'}}>
                    <Button onClick={() => setOpen(true)} Icon={AddBoxIcon}
                        title="Management Selection"/>
                </div>
                <ManagementSelection open={isOpen}
                    onCancel={() => setOpen(false)}
                    contractUrl={contractHRef}
                />
                <BindToStep hRef={hRef} property={'main_pool_split'}/>
                {poolSplit && poolSplit.map((pool: any, index: number) => (
                    <MainSplitPool
                        key={index}
                        data={response.data}
                        hRef={pool['product_component']}/>
                )
                )}
            </Section>
        </div>
    )
}

export default React.memo(InvestmentSplit);
