import { useDispatch } from "react-redux";
import { setBusy } from "../features/reducers/loading_slice";


export const useDelayService = () => {
    let dispatch = useDispatch();

    const delayRender = () => {
        setTimeout(()=>{
            dispatch(setBusy());
        }, 1000);
    };

    return [delayRender];
}