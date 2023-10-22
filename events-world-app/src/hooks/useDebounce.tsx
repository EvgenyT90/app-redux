import { useEffect, useRef } from "react";

export const useDebounce = (
    callback: Function,
    timeout: number = 300,
    deps: Array<any> = [],
) => {
    const data = useRef({
        firtsTime: true,
        clearFunc: () => {},
    });

    useEffect(() => {
        const { firtsTime, clearFunc } = data.current;
        const handler = setTimeout(() => {
            if (clearFunc && typeof clearFunc === "function") {
                clearFunc();
            }

            data.current.clearFunc = callback();
        }, timeout);

        return () => {
            clearTimeout(handler);
        };
    }, [timeout, ...deps]);
};
