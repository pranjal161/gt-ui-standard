import React, { useCallback, useState } from 'react';
import Stepper, { StepProps } from 'components/Stepper/Stepper';

import Button from 'components/Button/Button';
import {useTranslation} from 'react-i18next';
import DateInput from 'theme/components/material/DateInput/DateInput';
import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import WithScroll from 'components/WithScroll/WithScroll';
import { makeStyles } from '@material-ui/core/styles';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';
import { useSelector } from 'react-redux';

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
        maxWidth: '25%'
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

const ContractOperation: React.FC<ContractUpsertProps> = (props: any) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const hRef = props.hRef
    const {t} = useTranslation()
    const { getActivityConf } = useConfigurations();
    const isSideBarOpen = useSelector((state: any) => state.secondaryTabs.isSideBarOpen)
    const [currentStep, setCurrentStep] = useState(0);
    const classes: any = useStyles({ contentOffsetTop, sideBarOffsetTop });
    const activityResponse = useResponse(hRef);
    const { patch } = useAia();
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const steps = [
        {
            id: 0,
            label: t('common:_UNSOLICITED_PAYMENT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <UnsolicitedPayment hRef={hRef}/>
        },
        {
            id: 1,
            label: t('common:_INVESTMENT_SPLIT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InvestmentSplit hRef={hRef}/>
        },
        {
            id: 2,
            label: t('common:_INFORMATION_SHEET'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InformationSheet hRef={hRef}/>
        }
    ]
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

    const SideBarConf = configurations.sidebar;

    const nextStep = (index: number) => {
        const step = index >= steps.length ? steps.length - 1 : index;
        setCurrentStep(step);
    }

    const patchDate = (value:any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef,payload).then(() => {
            setCurrentStep(0);
        });
    }

    return (
        <div className={`col-12 ${classes.body}`}>
            <div className={`col-9 ${classes.bodyLeft}`}>

                <div className="d-flex pt-3 pb-3">
                    <div className="col-2">
                        {activityResponse && 
                        <DateInput propertyName="date_effect" onChangeMethod={(value: any) => patchDate(value, 'date_effect')} data={activityResponse.data} />}
                    </div>
                    <div className="col-10">
                        <Stepper currentStep={currentStep} steps={steps} showStepsAtATime={3} onChange={(index: number) => setCurrentStep(index)} />
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
                        <div className="m-2 p-1" style={{float: 'right'}}><Button onClick={() => nextStep(currentStep + 1)} title="_NEXT_BUTTON" /></div>
                    </WithScroll>
                </div>
            </div>
            <div ref={handleSideBarOffsetTop} className={isSideBarOpen ? `col-3 ${classes.bodyRight + ' ' + classes.sidebar}`: `${classes.bodyRight + ' ' + classes.sidebar}`}>
                <SideBarConf {...props} />
            </div>
        </div>
    );
}

export default ContractOperation;
