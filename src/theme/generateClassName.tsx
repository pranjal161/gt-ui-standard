import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'prd',
    seed: 'main'
});

export default generateClassName;