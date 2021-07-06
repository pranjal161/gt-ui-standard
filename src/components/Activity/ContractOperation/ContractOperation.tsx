import React, {useCallback, useEffect, useState} from 'react';
import Stepper, {StepProps} from 'components/Stepper/Stepper';

import Button from 'components/Button/Button';
import DateInput from 'theme/components/material/DateInput/DateInput';
import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import WithScroll from 'components/WithScroll/WithScroll';
import {makeStyles} from '@material-ui/core/styles';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';
import {useSelector} from 'react-redux';
import useStep from 'hooks/useStep';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {},
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
    content: ({contentOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${contentOffsetTop}px - 100px)`, // Footer to remove
        overflowY: 'hidden',
        '& > * > div': {
            marginBottom: theme.spacing(2)
        }
    }),
    sidebar: ({sideBarOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${sideBarOffsetTop}px - 100px)`, // Footer to remove
        backgroundColor: theme.palette.background.paper
    })
}))

//On step mount we set the current step
const Step = React.memo(({value}: any) => {
    //This is used to mount and set current step first before the inputs are bind to the step
    const [isMounted, setIsMounted] = useState(false)
    const {setCurentStep} = useStep()

    useEffect(() => {
        setCurentStep(value.code)
        setIsMounted(true)
    }, [])

    return isMounted ? value.component : <></>
})
Step.displayName = 'Step'

const ContractOperation: React.FC<any> = (props: any) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const hRef = props.hRef
    const {t} = useTranslation()
    const {baId, getActivityConf} = useConfigurations();
    const isSideBarOpen = useSelector((state: any) => state.secondaryTabs.secondaryTabsIDs[baId].isSideBarOpen);
    const [currentStep, setCurrentStep] = useState(0);
    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});
    const [activityResponse] = useResponse(hRef);
    const {patch} = useAia();
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const {canValidateStep} = useStep()

    const steps = [
        {
            id: 0,
            code: 'unsolicited_payment',
            label: t('common:_UNSOLICITED_PAYMENT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <UnsolicitedPayment response={activityResponse}/>
        },
        {
            id: 1,
            code: 'investment_split',
            label: t('common:_INVESTMENT_SPLIT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InvestmentSplit response={activityResponse}/>
        },
        {
            id: 2,
            code: 'information_sheet',
            label: t('common:_INFORMATION_SHEET'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InformationSheet response={activityResponse}/>
        }
    ]
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

    const SideBarConf = configurations.sidebar

    const nextStep = (index: number) => {

        if (canValidateStep()) {
            const step = index >= steps.length ? steps.length - 1 : index;
            setCurrentStep(step);
        }
        else {
            //Display errors
            console.log()
        }
    }

    const patchDate = (value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef, payload).then(() => {
            setCurrentStep(0);
        });
    }

    const currentStepConfig = steps && steps.filter((step: StepProps, index) => (step.id === currentStep))
    const CurrentStep = currentStepConfig && <Step key={currentStepConfig[0].id} value={currentStepConfig[0]}/> || <div></div>

    return (
        <div className={`col-12 ${classes.body}`}>
            <div className={`col-9 ${classes.bodyLeft}`}>

                <div className="d-flex pt-3 pb-3">
                    <div className="col-2">
                        {activityResponse &&
                        <DateInput propertyName="date_effect"
                            hRef={hRef}
                            onChangeMethod={(value: any) => patchDate(value, 'date_effect')}
                            data={activityResponse.data}/>}
                    </div>
                    <div className="col-10">
                        <Stepper currentStep={currentStep} steps={steps} showStepsAtATime={3}
                            onChange={(index: number) => setCurrentStep(index)}/>
                    </div>

                </div>
                <div ref={handleContentOffsetTop} className={classes.content}>
                    <WithScroll>
                        {CurrentStep}
                        <div className="m-2 p-1" style={{float: 'right'}}>
                            <Button onClick={() => nextStep(currentStep + 1)} title={t('common:_NEXT_BUTTON')}/>
                        </div>
                    </WithScroll>
                </div>
            </div>
            <div ref={handleSideBarOffsetTop}
                className={isSideBarOpen ? `col-3 ${classes.bodyRight + ' ' + classes.sidebar}` : `${classes.bodyRight + ' ' + classes.sidebar}`}>
                <SideBarConf mainEntityHRef={props.mainEntityHRef} hRef={props.hRef}/>
            </div>
        </div>
    );
}

export default ContractOperation;
