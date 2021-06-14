import baContext from 'context/baContext';
import { useContext } from 'react';

const useConfigurations = () => {
    const context = useContext(baContext)
    const baId: any = context.baId

    //Not finish
    return {
        baId
    }
}

export default useConfigurations;
