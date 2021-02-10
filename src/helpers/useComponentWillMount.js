import {useRef} from "react";

export const useComponentWillMount = (cb, arg) => {
    const willMount = useRef(true);

    if (willMount.current) {
        cb(arg)
    }
    willMount.current = false;
};