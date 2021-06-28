import {shallowEqual, useSelector} from 'react-redux';
import {useContext, useEffect} from 'react';
import baContext from 'context/baContext';
import useAia from 'hooks/useAia';


const useResponse = (hRef: string | undefined) => {
    const context = useContext(baContext)
    const baId: any = context.baId
    const {fetch} = useAia();

    useEffect(() => {
        if (!hRef)
            return

        fetch(hRef)
    }, [hRef, fetch])

    return useSelector((state: any) => hRef && state.aia[baId] && state.aia[baId][hRef], shallowEqual);
}

export default useResponse
