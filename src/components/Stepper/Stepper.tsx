import { Bell, LeftArrow, RightArrow, ThreeDots } from 'assets/svg';
import { DxcDialog, DxcWizard } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import ActivitySteps from './component/ActivitySteps/ActivitySteps';
import IconButton from 'theme/components/material/IconButton/IconButton';
import OptActive from 'assets/opt-active.svg';
import OptInactive from 'assets/opt-inactive.svg';
import PencilIcon from 'assets/edit-icon.svg';
import React from 'react';

type Props = {
    width: any;
};

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
    stepper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        maxWidth: 30,
        display: 'flex',
        overflow: 'hidden'
    },
    wizard: {
        maxWidth: 'calc(100% - 120px)',
        width: '100%',
        overflow: 'hidden',
        '& > div > div': {
            flex: ({ width }) => {
                const widthContent = width ? width : '33.333';

                return `0 0 ${widthContent}%`
            },
            '&:first-child button': {
                marginLeft: 20
            },
            '& button': {
                '& > div > div': {
                    width: '2rem !important',
                    height: '2rem !important'
                }
            },
            '& p' : { fontSize: '70% !important'}
        },
        '& button': {
            '& + div': {
                border: '0 !important',
                borderBottom: 'solid 2px #D9D9D9 !important'
            }
        }
    },
    options: {
        width: 38,
        marginLeft: 10,
        display: 'flex',
        position: 'relative',

        '& > div': {
            display: 'flex',
            alignItems: 'center'
        },

        '& button': {
            minWidth: '38px !important',
            maxHeight: '38px !important',
            minHeight: 38,
            border: `1px solid ${theme.palette.text.primary}`,
            padding: 0,
            borderRadius: 5,

            '& svg': {
                fill: theme.palette.text.primary,
                width: 28,
                marginLeft: 7,
                marginTop: 5
            }
        }
    },
    moreOptions: {
        position: 'absolute',
        bottom: -6,
        right: -14,
        background: '#fff',
        padding: '2px 0 !important',

        '& svg': {
            fill: '#77C149',
            height: 15
        }
    }
}));

export interface StepProps {

    /**
     * Unique ID - needed in case of Optional Step
     */
    id: number,

    /**
     * code for each step
     */
    code: string,

    /**
     * Title for each step
     */
    label: string,

    /**
     * If step is main or optional - True: Required, False: Optional
     */
    required: boolean,

    /**
     * if step is validated and correct
     */
    fullfilled: boolean,

    /**
     * if step is disabled
     */
    disabled?: boolean,

    /**
     * if step is validated and incorrect
     */
    error?: boolean,

    /**
     * if step is validated and incorrect
     */
    component?: any
}

export interface StepperProps {

    /**
     * Number of steps visible at a time
     */
    showStepsAtATime: number,

    /**
     * Steps Array
     */
    steps: Array<StepProps>,

    /**
     * Active Step - Step Count starts from 0
     */
    currentStep: number,

    /**
     * On step click
     */
    onChange?: Function
}

const Stepper = (props: StepperProps) => {
    const { showStepsAtATime, steps, currentStep, onChange } = props;
    const scrollSection: any = React.createRef();
    const [leftDisable, setLeftDisable] = React.useState(true);
    const [rightDisable, setRightDisable] = React.useState(true);
    const [moveOptionsAhead, setMoveOptionsCount] = React.useState(0);
    const [isDialogVisible, setDialogVisible] = React.useState(false);
    const [requiredSteps, setRequiredSteps] = React.useState([{}]);
    const [updateStep, setUpdatedSteps] = React.useState({ optional: [{}], stepper: [{}]});
    const [currentActiveStep, setActiveStep] = React.useState(currentStep); 
    const classes:any = useStyles({ width: 100/showStepsAtATime });

    const openCloseModal = () => {
        setDialogVisible(!isDialogVisible);
    };

    const slideRight = () => {
        scrollSection.current.scrollLeft += moveOptionsAhead;
        disableButtons();
    }

    const slideLeft = () => {
        scrollSection.current.scrollLeft -= moveOptionsAhead;
        disableButtons();
    }

    const calculateMotionPixels = () => {
        let moveOptionsAhead = scrollSection.current.offsetWidth * ((100 / showStepsAtATime) / 100);
        //If Need to show more number of steps in one next/prev click
        // setMoveOptionsCount(moveOptionsAhead * showStepsAtATime);
        //Currently showing just one step on every next/prev
        setMoveOptionsCount(moveOptionsAhead + 4);
    }

    const getFilteredSteps = (value: boolean) => {
        const filteredsteps = steps && steps.filter((array: any) => array['required'] === value);

        return filteredsteps;
    }

    React.useEffect(() => {
        if (scrollSection && scrollSection.current) {
            disableButtons();
            calculateMotionPixels();
        }
    }, [scrollSection])

    React.useEffect(() => {
        if (steps) {
            const mainsteps = getFilteredSteps(true);
            setRequiredSteps(mainsteps);
            const optionalsteps = getFilteredSteps(false);
            const updatedMainsteps = renderSteps(mainsteps);
            setUpdatedSteps({ optional: optionalsteps, stepper: updatedMainsteps });
        }
    }, [steps, currentStep])

    React.useEffect(() => {
        setActiveStep(currentStep); 
        if (scrollSection && scrollSection.current) {
            const childrens = scrollSection.current.children[0].children;
            const addedStep = childrens[currentStep];
            if (addedStep) {
                addedStep.scrollIntoView();
            }
        }
    }, [currentStep])

    const renderSteps = (mainsteps: Array<{}>) => {
        let counter = 0;
        const updatedSteps: any = mainsteps.map((step: any) => {
            if (step.error) step.valid = !step.error;
            if (step.fullfilled) step.valid = step.fullfilled;
            if (step.required) counter = counter + 1;
            step.description = `${counter}/${mainsteps.length}`;
            if (counter+1 < currentStep) step.iconSrc = PencilIcon;
            if (counter+1 === currentStep) {
                step.disabled = false;
                step.active = true;
            }

            return step;
        });

        return updatedSteps;
    }

    const disableButtons = () => {
        const scrollLeft = scrollSection.current.scrollLeft;
        setLeftDisable(scrollLeft === 0);
        const width = scrollSection.current.offsetWidth;
        const scrollWidth = scrollSection.current.scrollWidth;
        setRightDisable(parseInt(scrollWidth) - parseInt(scrollLeft) === width);
        // console.log('scrollWidth-->', parseInt(scrollWidth), 'scrollLeft-->', parseInt(scrollLeft),'width-->', parseInt(width));
        // console.log('heree -->', scrollWidth - scrollLeft === width + 2);
    }

    const renderOptionalStep = (stepId: number) => {
        let stepIndex = 0;
        const updateOptionsStep = updateStep['optional'].map((opt: any, index: number) => {
            opt.active = false;
            opt.iconSrc = OptInactive;
            if (opt.id === stepId) {
                stepIndex = index;
                opt.iconSrc = OptActive;
                opt.description = 'Optional';
                opt.active = true;
            }

            return opt;
        });

        return updateOptionsStep[stepIndex];
    }

    const removeActiveStep = (array: Array<any>, index?: number) => {
        const removeActiveStep = array.map((array: any, inx: number) => { 
            let icon = index && index === inx && (array.iconsrc === OptInactive || array.iconSrc === OptActive) ? OptActive : index && index !== inx && (array.iconsrc === OptInactive || array.iconSrc === OptActive) ? OptInactive : array.iconSrc ? array.iconSrc : null;
            
            return array['active'] ? {...array, active: false, iconSrc: icon} : {...array, iconSrc: icon}
        });

        return removeActiveStep;
    }

    const addMoveToStep = (id: number, isAvailableInStepper?: number) => {
        const optionalStep = renderOptionalStep(id);
        if (optionalStep) {
            scrollSection.current.scrollLeft = 0;
            let stepper;
            if (isAvailableInStepper) {
                stepper = removeActiveStep(updateStep['stepper'], isAvailableInStepper);
                stepper[isAvailableInStepper + 1]['active'] = true;
            }
            else {
                stepper = updateStep['stepper'];
                stepper.splice(currentActiveStep + 1, 0, optionalStep);
            }
            setUpdatedSteps({ ...updateStep, stepper: stepper });
            const childrens = scrollSection.current.children[0].children;
            const toBeAdded = isAvailableInStepper ? isAvailableInStepper : currentActiveStep + 1;
            const addedStep = childrens[toBeAdded + 1];
            addedStep.scrollIntoView();
            setActiveStep(toBeAdded);
        }
    }

    const clickOptionalStep = (id: number) => {
        const requiredsteps = removeActiveStep(requiredSteps);
        setRequiredSteps(requiredsteps);
        const index = updateStep['optional'].findIndex((opt: any) => opt.id === id);
        const isAvailableInStepper = updateStep['stepper'].findIndex((opt: any) => opt.id === id);
        const isActive: any = updateStep['optional'][index];
        if (isAvailableInStepper && isAvailableInStepper < 0) {
            addMoveToStep(id);
        }
        else if (isActive && !isActive['active']) {
            addMoveToStep(id, isAvailableInStepper);
        }
        setDialogVisible(false);
    }

    return (<>
        <div className={classes.stepper}>
            <div className={classes.arrow}>
                <IconButton
                    disabled={leftDisable}
                    onClick={slideLeft}>
                    <LeftArrow />
                </IconButton>
            </div>
            <div className={classes.wizard} ref={scrollSection} data-testid={'wizard'}>
                <DxcWizard
                    currentStep={currentActiveStep}
                    steps={updateStep['stepper']}
                    onStepClick={onChange}
                ></DxcWizard>
            </div>
            <div className={classes.arrow}>
                <IconButton
                    disabled={rightDisable}
                    onClick={slideRight}>
                    <RightArrow />
                </IconButton>
            </div>
            <div className={classes.options} data-testid="option-button">
                <IconButton
                    onClick={openCloseModal}>
                    <ThreeDots />
                </IconButton>
                {updateStep['optional'].length > 0 && <div className={classes.moreOptions}>
                    <Bell />
                </div>}
            </div>

            {isDialogVisible && (
                <DxcDialog padding="xxsmall" onCloseClick={openCloseModal}>
                    <ActivitySteps onClick={clickOptionalStep} mainSteps={requiredSteps} optionalSteps={updateStep['optional']} />
                </DxcDialog>
            )}
        </div>
    </>);
}

export default Stepper;
