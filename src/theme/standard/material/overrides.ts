import palette from './palette';
//Add here material ui component to override property for the entire of the application

//related cdk configuration : node_modules/@dxc-technology/halstack-react/dist/common/variables.js

const overrides = {
    MuiIconButton: {
        root: {
            color: palette.icon,
        },
    },
    //https://codesandbox.io/s/mj9x1zy4j9?file=/demo.js
    MuiTabs: {
        root: {
            backgroundColor: palette.white,
            color: palette.primary.main,
        },
        indicator: {
            backgroundColor: palette.primary.main
        }
    },
    MuiTab: {
        root: {
            '&$selected': {
                color: palette.primary.main,

                //outline: '#6f2c91C auto 2px'
            },
            '&:focus': {
                //borderTop: '1px solid #6f2c91',
                //outline: `${dxcColors.mediumGrey} auto 2px`,
            },
            '&:hover': {
                backgroundColor: palette.primary.light
            },
        },
    },
}
export default overrides

