import React, {useCallback, useState} from 'react';
import {ActivityProps} from 'components/Activity/Activity';
import WithScroll from 'components/WithScroll/WithScroll';
import {makeStyles} from '@material-ui/core/styles';
import useConfigurations from 'hooks/useConfigurations';

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
    toBeDefine: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%'
    },
    content: ({contentOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${contentOffsetTop}px - 100px)`, // Footer to remove
        overflowY: 'hidden',
    }),
    sidebar: ({sideBarOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${sideBarOffsetTop}px - 100px)`, // Footer to remove
        backgroundColor: theme.palette.background.paper
    })
}))

const ContractView: React.FC<any> = (props: ActivityProps) => {
    const {hRef, activityProps } = props
    const {activityCode, mainEntityHRef } = activityProps
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const {getActivityConf} = useConfigurations();

    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(activityCode)

    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const handleSidebarChange = useCallback ((open:boolean) => {
        setIsSideBarOpen(open)
    },[setIsSideBarOpen])

    const SideBarConf = configurations.sidebar
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    return (
        <div className={`col-12 ${classes.body}`}>
            <div className={`col-9 ${classes.bodyLeft}`}>
                <div ref={handleContentOffsetTop} className={classes.content}>
                    <WithScroll>
                        <div className={classes.toBeDefine}>Contract Detail to be define</div>
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

export default ContractView;
