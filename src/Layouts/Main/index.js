import React, { Fragment, useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import _U from "@util/utilities";

import Header from "./Header";
import { AppContext } from "@component/AppProvider";
import Loading from "@component/UI/Loading";
import _CK from "@util/cookie";
import _API from "@util/api";
import Dialog from "@component/UI/Dialog";

export default (props) => {
    const { children } = props;
    const { t } = useTranslation();

    const location = useLocation();
    const { innerLoading } = useContext(AppContext);

    return (
        <Fragment>
            {innerLoading && <Loading />}
            <a href="#go-content" className="bypass">
                {t("subtext.go.main.content")}
            </a>
            <div id="ROOT_CONTAINER" className={`wrapper`}>
                <Header />
                <div id="content-container-div" className={cx({ "content-container": true })}>
                    <main id="go-content" className={`content-box `}>
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
};
