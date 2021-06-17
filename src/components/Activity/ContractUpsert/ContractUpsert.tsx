import React, { useCallback, useState } from 'react';
import Stepper, { StepProps } from 'components/Stepper/Stepper';

import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import WithScroll from 'components/WithScroll/WithScroll';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useConfigurations from 'hooks/useConfigurations';

export interface ContractUpsertProps {

    /**
     * Data coming from API response
     */
    data?: any

    /**
     * Code of the activity
     */
    activityCode: string
}

const useStyles = makeStyles((theme) => ({
    root: {

    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '100%'
    },
    bodyLeft: {
        flex: '1 1 auto',
        marginRight: theme.spacing(4)
    },
    bodyRight: {
        minWidth: '44px'
    },
    content: ({ contentOffsetTop = '' }: any) => ({
        height: `calc(100vh - ${contentOffsetTop}px - 100px)`, // Footer to remove
        overflowY: 'hidden',
        '& > * > div': {
            marginBottom: theme.spacing(2)
        }
    }),
    sidebar: ({ sideBarOffsetTop = '' }: any) => ({
        height: `calc(100vh - ${sideBarOffsetTop}px - 100px)`, // Footer to remove
        backgroundColor: theme.palette.background.paper
    })
}))

const ContractUpsert: React.FC<ContractUpsertProps> = (props: any) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const { getActivityConf } = useConfigurations()
    const [currentStep, setCurrentStep] = useState(0);
    const classes: any = useStyles({ contentOffsetTop, sideBarOffsetTop });
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const steps = [
        {
            id: 0,
            label: '_UNSOLICITED_PAYMENT',
            required: true,
            fullfilled: true,
            error: true,
            component: <UnsolicitedPayment />
        },
        {
            id: 1,
            label: '_INVESTMENT_SPLIT',
            required: true,
            fullfilled: true,
            error: true,
            component: <InvestmentSplit />
        },
        {
            id: 2,
            label: '_INFORMATION_SHEET',
            required: true,
            fullfilled: true,
            error: true,
            component: <InformationSheet />
        }
    ]
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

    const SideBarConf = configurations.sidebar;

    const previousStep = (index: number) => {
        const step = index < 0 ? 0 : index;
        setCurrentStep(step);
    }

    return (
        <div className={classes.body}>
            <div className={classes.bodyLeft}>

                <div className={classes.header}>
                    <div>---------Date effect input-------</div>
                    <div>
                        <Stepper currentStep={currentStep} steps={steps} showStepsAtATime={3} onChange={() => previousStep(currentStep - 1)} />
                    </div>

                </div>
                <div ref={handleContentOffsetTop} className={classes.content}>
                    <WithScroll>
                        {steps.map((step: StepProps) => (
                            <>
                                {step.id === currentStep &&
                                    (
                                        <>{step.component}</>
                                    )
                                }
                            </>
                        ))
                        }

                    </WithScroll>
                </div>

            </div>
            <div ref={handleSideBarOffsetTop} className={clsx(classes.bodyRight, classes.sidebar)}>
                <SideBarConf {...props} />
            </div>
        </div>
    );
}

export default ContractUpsert;
