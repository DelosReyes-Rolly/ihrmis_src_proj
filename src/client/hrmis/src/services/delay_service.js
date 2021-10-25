import { useDispatch } from "react-redux";
import { setFail, setSuccess } from "../features/reducers/popup_response";


export const useDelayService = () => {
    let dispatch = useDispatch();

    // const delayRender = () => {
    //     setTimeout(()=>{
    //         dispatch();
    //     }, 1000);
    // };

    const successRender = () => {
        dispatch(setSuccess(true));
        setTimeout(()=>{
            dispatch(setSuccess(false));
        }, 5000);
    };

    const failRender = () => {
        dispatch(setFail(true));
        setTimeout(()=>{
            dispatch(setFail(false));
        }, 5000);
    };

    return [failRender, successRender];
}