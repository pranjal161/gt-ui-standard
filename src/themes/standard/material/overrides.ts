import palette from 'themes/standard/material/palette';
const overrides = {
    MuiIconButton: {
        root: {
            color: palette.icon,
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.03)'
            }
        }
    }
}
export default overrides

