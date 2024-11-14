import { useEffect } from "react";

const useCss = (url) => {
    useEffect(() => {
        const link = document.createElement("link");
        link.href = url;
        link.type = "text/css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, [url]);
};

export default useCss;
