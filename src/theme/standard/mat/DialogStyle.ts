export const DialogStyle = {
    root: {
        '& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthMd.MuiDialog-paperFullWidth.MuiPaper-elevation24.MuiPaper-rounded': {
            maxHeight: 666,
        },

        '& .MuiDialog-paperWidthMd': {
            maxWidth: 1150
        }
    },
    titleRoot: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '32px',
        '& > div' : {
            display: 'inline-flex',
            alignItems: 'center'
        }
    },
    titleIcon: {
        '& > *': {
            marginRight: '12px'
        }
    },
    title: {},
    actions: {
        display: 'inline-flex',
        marginTop:'28px',
        marginBottom:'28px',
        justifyContent: 'center',
        '& > *': {
            paddingRight: '65px'
        }},
    content:{
        padding: '0 32px',
    }
}
