import React, { Fragment, useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import cx from "classnames";

import { AppContext } from "@component/AppProvider";
import _API from "@util/api";
import _U from "@util/utilities";
import _CK from "@util/cookie";
import _CodeInfo from "@util/codeInfo";

import Dialog from "@component/UI/Dialog";

export default (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { saveInnerLoading } = useContext(AppContext);

    return (
        <Fragment>
            <div id="popup-save-fail" className="popup-wrapper show">
                <div className="dim">&nbsp;</div>
                <div className="popup pop-small" role="dialog" aria-labelledby="popup-label" aria-modal="true">
                    <div className="popup-container">
                        <div className="popup-header"></div>

                        <div className="popup-content">
                            <div className="description">{props?.data?.message}</div>
                        </div>

                        <div className="popup-footer">
                            <div className="button-box double-button">
                                <button
                                    type="button"
                                    id="btn-add"
                                    className="btn btn-tertiary"
                                    onClick={() => {
                                        props?.data?.onClick1 && props?.data?.onClick1();
                                    }}
                                    disabled={props?.data?.btnDisabled1}
                                >
                                    {props?.data?.btnText1}
                                </button>
                                <button
                                    type="button"
                                    id="btn-end"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        props?.data?.onClick2 && props?.data?.onClick2();
                                    }}
                                    disabled={props?.data?.btnDisabled2}
                                >
                                    {props?.data?.btnText2}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
