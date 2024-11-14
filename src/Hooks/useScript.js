import { useEffect } from "react";

const useScript = (url, onLoad) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
        if (onLoad) {
            script.onload = onLoad;
        }

        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
};

export default useScript;
