import { AddBoxIcon, AddFolderIcon, PaymentIcon } from 'assets/svg';

import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import { ActivityProps } from 'components/Activity/Activity';
import BindToStep from 'components/BindToStep/BindToStep';
import Button from 'components/Button/Button';
import ComplexTable from 'components/ComplexTable/ComplexTable';
import ManagementSelection from './ManagementSelection/ManagementSelection';
import Rate from 'components/Rate/Rate';
import React from 'react';
import Section from 'components/Section/Section';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import useSetDataToPatch from 'hooks/useSetDataToPatch';

interface SplitPoolInterface {
    hRef: string,
    data: any,
    patchOn: string,
    pool: any,
    actions?: any,
    columns?: Array<any>
    defaultExpanded?:boolean
}

export const MainSplitPool = (props: SplitPoolInterface) => {
    const [poolResponse] = useResponse(props.hRef);
    const { setDataToPatch } = useSetDataToPatch();
    const { patch } = useAia();
    const rowExtraData = { hRefKey: 'allocation:coverage_fund', list: 'investment_split' };
    const tableData = props.data['investment_split'].filter((funds: any) => funds['parent_product_component'] === props.hRef);
    const tableResponse = { ...props.data, investment_split: tableData }

    const MainPoolActions = () => {

        const patchMainPool = (value: string) => {
            if (value !== '') {
                const mainPool = JSON.parse(JSON.stringify(props.data['main_pool_split']));
                const payloadToPatch = mainPool.map((split: { 'product_component': string }) => (split['product_component'] === props.hRef ? { ...split, 'allocation:amount': parseInt(value) } : { ...split }));
                patch(props.patchOn, { 'main_pool_split': payloadToPatch }).then();
            }
        }

        return (
            <div className="d-flex col-6">
                <TextField 
                    notToStore={true} 
                    size="fillParent" 
                    onChange={(value: any) => patchMainPool(value)} 
                    property="allocation:amount" 
                    hRef={props.patchOn} 
                    list={{ ...props.pool, listName: 'main_pool_split' }} 
                    type="currency" />
            </div>)
    }

    const investmentSplit = props?.data?.investment_split;
    const [dataToPatch, setPatchingData] = React.useState(investmentSplit);
    const onchange = (updated: any) => {
        const payloadToPatch = dataToPatch.map((split: { 'allocation:coverage_fund': string }) => (split['allocation:coverage_fund'] === updated.data['allocation:coverage_fund'] ? { ...split, 'allocation:rate': parseInt(updated['value']) } : { ...split }));
        setPatchingData(payloadToPatch);
        setDataToPatch({ hRef: props.patchOn, property: 'investment_split', value: payloadToPatch });
    }
    const headers = [
        { title: 'Funds' },
        { title: 'Rate' }
    ];
    const columns = [
        { valueKey: 'coverage_fund:label', hRefKey: true },
        { valueKey: 'allocation:rate', component: Rate, onChange: onchange, list: true }
    ];

    return (
        <>
            {poolResponse && poolResponse.data &&
                <AccordionContainer
                    title={poolResponse.data['coverage_fund:label']}
                    prefixActions={<AddFolderIcon/>}
                    defaultExpanded={props.defaultExpanded}
                    actions={props.actions ? props.actions : <MainPoolActions />}>

                    <ComplexTable
                        columns={props.columns ? props.columns : columns} 
                        rowExtraData={rowExtraData}
                        headers={headers}
                        data={tableResponse} />

                </AccordionContainer>}
        </>
    );
}

const InvestmentSplit: React.FC<ActivityProps> = (props: { hRef: string }) => {
    const { hRef } = props
    const { activityProps } = useActivity()
    const { mainEntityHRef } = activityProps
    const [response] = useResponse(hRef)

    const [isOpen, setOpen]: [boolean, Function] = React.useState(false);

    const contractHRef = mainEntityHRef
    const poolSplit = response.data['main_pool_split'];

    return (
        <div className="col-12 mb-4">
            <Section title="Investment Split" icon={<PaymentIcon />}>
                {/* API need to add oneOf instead of type string */}
                <SelectInput
                    property="allocation_type"
                    hRef={hRef} />
                <div style={{ float: 'right' }}>
                    <Button onClick={() => setOpen(true)} Icon={AddBoxIcon}
                        title="Management Selection" />
                </div>
                <ManagementSelection open={isOpen}
                    onCancel={() => setOpen(false)}
                    contractUrl={contractHRef}
                />
                <BindToStep hRef={hRef} property={'main_pool_split'} />
                <BindToStep hRef={hRef} property={'investment_split'} />
                {poolSplit && poolSplit.map((pool: any, index: number) => (
                    <MainSplitPool
                        key={index}
                        pool={pool}
                        data={response.data}
                        patchOn={hRef}
                        hRef={pool['product_component']} />
                )
                )}
            </Section>
        </div>
    )
}

export default React.memo(InvestmentSplit);
