import { MainSplitPool } from '../InvestmentSplit/InvestmentSplit';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useLabelValue from 'hooks/useLabelValue';
import useResponse from 'hooks/useResponse';

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.palette.project.text.label,
        fontFamily: theme.typography.fontFamily,
        fontSize: 12
    },
    value: {
        color: theme.palette.text.primary,
        fontSize: 17
    }
}));

const InvestmentAllocation = (props: { hRef: string }) => {
    const [response, loading] = useResponse(props.hRef)
    const {Label, Value} = useLabelValue({property: 'allocation_type', hRef: props.hRef, response: response, loading: loading});
    const poolSplit = response.data['main_pool_split'];
    const classes: any = useStyles();
    const columns = [
        { valueKey: 'coverage_fund:label', hRefKey: true },
        { valueKey: 'allocation:rate', format: 'percent', list: true }
    ];
    const actions = <div className={'d-flex'}>
        <label>Rate</label><label className={'ml-2'}><b>%</b></label>
    </div>

    return (<>
        <div className={`${classes.label} mt-2`}>
            <Label />
        </div>
        <div className={`${classes.value} mb-3`}>
            <Value />
        </div>
        {poolSplit && poolSplit.map((pool: any, index: number) => (
            <MainSplitPool
                key={index}
                data={response.data}
                patchOn={props.hRef}
                hRef={pool['product_component']}
                actions={actions}
                columns={columns} />
        )
        )}
    </>)

}

export default InvestmentAllocation;