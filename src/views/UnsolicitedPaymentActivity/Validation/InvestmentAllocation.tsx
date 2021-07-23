import LabelInBlock from 'components/LabelInBlock/LabelInBlock';
import { MainSplitPool } from '../InvestmentSplit/InvestmentSplit';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useResponse from 'hooks/useResponse';

const useStyles = makeStyles(() => ({
    leftspacing: {
        marginLeft: 10
    }
}));

const InvestmentAllocation = (props: { hRef: string }) => {
    const [response, loading] = useResponse(props.hRef)
    const poolSplit = response.data['main_pool_split'];
    const classes: any = useStyles();
    const columns = [
        { valueKey: 'coverage_fund:label', hRefKey: true },
        { valueKey: 'allocation:rate', format: 'percent', list: true }
    ];
    const actions = <div className={'d-flex'}>
        <label>Rate</label><label className={classes.leftspacing}><b>%</b></label>
    </div>

    return (<>
        <div className="row">
            <div className="col-11 px-5">
                <div className="row px-4">
                    <div className="col-12 mt-2 mb-4">
                        <LabelInBlock property={'allocation_type'} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
        {poolSplit && poolSplit.map((pool: any, index: number) => (
            <MainSplitPool
                key={index}
                defaultExpanded={true}
                data={response.data}
                patchOn={props.hRef}
                pool={pool}
                hRef={pool['product_component']}
                actions={actions}
                columns={columns} />
        )
        )}
    </>)

}

export default InvestmentAllocation;