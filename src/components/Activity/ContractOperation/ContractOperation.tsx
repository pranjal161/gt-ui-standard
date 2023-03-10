import React, {useCallback, useState} from 'react';
import Stepper, {StepProps} from 'components/Stepper/Stepper';

import ActivityStep from 'components/ActivityStep/ActivityStep';
import Button from 'components/Button/Button';
import DateInput from 'theme/components/material/DateInput/DateInput';
import WithScroll from 'components/WithScroll/WithScroll';
import { isResponseConsistent } from 'utils/functions';
import {makeStyles} from '@material-ui/core/styles';
import {scrollIntoView} from 'utils/system';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import useStep from 'hooks/useStep';
import useTabs from 'hooks/useTabs';
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

const ContractOperation: React.FC<any> = (props: {hRef:string}) => {
    const {hRef} = props;
    const [ response ] = useResponse(hRef);
    const {activityProps, getSteps, configurations} = useActivity();
    const {mainEntityHRef } = activityProps
    const {t} = useTranslation()
    const initialSteps = getSteps();
    const [steps, setSteps] = useState(initialSteps);
    const {validateStep} = useStep()
    const {openNewTab, forContract} = useTabs()

    //------------- Side bar and dynamic layout management
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const handleSidebarChange = useCallback((open: boolean) => {
        setIsSideBarOpen(open)
    }, [setIsSideBarOpen])
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);
    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});
    //-------------

    const [currentStep, setCurrentStep] = useState(0);
    const [activityResponse] = useResponse(hRef);
    const {patch, post} = useAia();

    const SideBarConf = configurations.sidebar

    const nextStep = useCallback ((index: number) => {
        validateStep().then((inputErrors:any) => {
            if (inputErrors.length === 0) {
                const step = index >= steps.length ? steps.length - 1 : index;
                if (currentStepConfig && currentStepConfig[0].isValidationStep) {
                    executeTransferOperation();
                }
                // eslint-disable-next-line array-callback-return
                steps.map((step: StepProps) => {
                    if (step.id <= currentStep) {
                        step['valid'] = true;
                    }
                });
                setSteps(steps);
                setCurrentStep(step);
            }
            else {
                //We scroll to view the first error
                scrollIntoView(inputErrors[0])
            }
        })
    }, [steps, validateStep])

    const patchDate = useCallback((value: any, id: string) => {
        patch(hRef, {[id] : value}).then(() => {
            setCurrentStep(0);
        });
    }, [hRef, patch])

    const currentStepConfig = steps && steps.filter((step: StepProps) => (step.id === currentStep))
    const CurrentStepComponent = currentStepConfig && currentStepConfig[0].component
    const CurrentStep = currentStepConfig &&
        <ActivityStep key={currentStepConfig[0].id} code={currentStepConfig[0].code}>
            <CurrentStepComponent hRef={hRef} />
        </ActivityStep> || <div/>

    const handleStepperOnChange = useCallback((index: number) => {
        if (index > currentStep) {
            nextStep(index);
        }
        else setCurrentStep(index)
    }, [validateStep])

    const TitleOfNextValidateButton = currentStepConfig && currentStepConfig[0].isValidationStep ?
        t('common:_VALIDATE_BUTTON'):t('common:_NEXT_BUTTON')

    const executeTransferOperation = () => {
        if (response && response.data && isResponseConsistent(response.data)) {
            if (response.data._embedded['cscaia:execute']) {
                const transferUrl = hRef + '/execute';

                post(transferUrl, {}).then(() => {
                    openNewTab(forContract({title: 'Contract', hRef:mainEntityHRef}))
                });
            }
        }
    }

    return (
        <div className={`col-12 ${classes.body}`}>
            <div className={`col-9 ${classes.bodyLeft}`}>
                <div className="d-flex pt-3 pb-3">
                    <div className="col-2">
                        {activityResponse &&
                        <DateInput property="date_effect"
                            hRef={hRef}
                            onChange={(value: any) => patchDate(value, 'date_effect')} />}
                    </div>
                    <div className="col-10">
                        <Stepper currentStep={currentStep} steps={steps} showStepsAtATime={3}
                            onChange={handleStepperOnChange}/>
                    </div>
                </div>
                <div ref={handleContentOffsetTop} className={classes.content}>
                    <WithScroll>
                        {CurrentStep}

                        <div className="m-2 p-1" style={{float: 'right'}}>
                            <Button onClick={() => nextStep(currentStep + 1)} title={TitleOfNextValidateButton}/>
                        </div>
                    </WithScroll>
                </div>
            </div>
            <div ref={handleSideBarOffsetTop}
                className={isSideBarOpen ? `col-3 ${classes.bodyRight + ' ' + classes.sidebar}` : `${classes.bodyRight + ' ' + classes.sidebar}`}>
                <SideBarConf mainEntityHRef={mainEntityHRef} hRef={hRef} onChange={handleSidebarChange}/>
            </div>
        </div>
    );
}

export default React.memo(ContractOperation);
