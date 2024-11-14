import React, { Fragment, useState, useEffect, useContext } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import _CK from "@util/cookie";
import _U from "@util/utilities";
import _API from "@util/api";
import { AppContext } from "@component/AppProvider";

import { TooltipBottom } from "@component/Tooltip";

export default (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { auth, businessList, workspace, saveWorkspace, product, rolePermission, sideBarExpand, saveSideBarExpand, hoverChild, saveHoverChild } = useContext(AppContext);

    return (
        <Fragment>
            <div className="header-container main">
                <header>
                    <div className="left-side">
                        <h2>
                            <a href="/" className="logo">
                                LG Device Care Mobile
                            </a>
                        </h2>
                    </div>
                </header>
            </div>
        </Fragment>
    );
};
