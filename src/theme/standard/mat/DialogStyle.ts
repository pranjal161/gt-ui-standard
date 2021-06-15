export const DialogStyle = {
    titleRoot: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
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
        marginTop:'16px',
        marginBottom:'16px',
    }
}
