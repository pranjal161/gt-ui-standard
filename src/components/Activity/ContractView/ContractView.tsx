import React, {useCallback, useState} from 'react';

import WithScroll from 'components/WithScroll/WithScroll';
import {makeStyles} from '@material-ui/core/styles';
import useConfigurations from 'hooks/useConfigurations';
import {useSelector} from 'react-redux';

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

const ContractView: React.FC<any> = (props: any) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const { baId ,getActivityConf} = useConfigurations();
    let newBaId = baId;
    if (newBaId && newBaId.includes('_secondary')) {
        newBaId= baId.split('_')[0];
    }
    const isSideBarOpen = useSelector((state: any) => (state.secondaryTabs.secondaryTabsIDs[newBaId] ? state.secondaryTabs.secondaryTabsIDs[newBaId].isSideBarOpen : state.newWindow.windowTabsIDs[newBaId].isSideBarOpen ))
    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

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
                <SideBarConf mainEntityHRef={props.mainEntityHRef} hRef={props.hRef}/>
            </div>
        </div>
    );
}

export default ContractView;
