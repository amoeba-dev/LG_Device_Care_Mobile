import React from "react";
import { useTranslation } from "react-i18next";

export default (props) => {
    const { t } = useTranslation();

    return (
        <div className={`loading ${props?.className || ""}`}>
            <div className="loading-icon"></div>
            {props?.loadingText ? <span>{props?.loadingText}</span> : props?.loadingBody ? props?.loadingBody : <span>{t("common.label.Loading")}...</span>}
        </div>
    );
};
