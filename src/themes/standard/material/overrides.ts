import dxcColors from 'themes/standard/dxcColors';
import palette from './palette';
//Add here material ui component to override property for the entire of the application
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
            backgroundColor: dxcColors.purple
        }
    },
    MuiTab: {
        root: {
            '&$selected': {
                color: dxcColors.purple,

                //outline: '#6f2c91C auto 2px'
            },
            '&:focus': {
                //borderTop: '1px solid #6f2c91',
                //outline: `${dxcColors.mediumGrey} auto 2px`,
            },
            '&:hover': {
                backgroundColor: dxcColors.lightPurple
            },
        },
    },
}
export default overrides

