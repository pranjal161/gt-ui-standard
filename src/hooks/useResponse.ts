import {useContext, useEffect} from 'react';
import baContext from 'context/baContext';
import useAia from 'hooks/useAia';
import {useSelector} from 'react-redux';

const useResponse = (hRef:string) => {
    const context = useContext(baContext)
    const baId: any = context.baId
    const { fetch } = useAia();

    useEffect(() => {
        if (!hRef)
            return
        fetch(hRef)
    }, [hRef])

    return useSelector((state:any) => hRef && state.aia[baId] && state.aia[baId][hRef]);
}

export default useResponse
