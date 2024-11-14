import React, { Fragment, useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import cx from "classnames";
import qs from "query-string";

import _API from "@util/api";
import _U from "@util/utilities";
import Dialog from "@component/UI/Dialog";
import Loading from "@component/UI/Loading";
import Modal from "@component/UI/Modal";
import _CK from "@util/cookie";

export default () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const goPage = (url) => {
        navigate(url);
    };
    return (
        <Fragment>
            <div className="content-top"></div>
            <div className="content-middle">
                <div className="content-middle-box main">
                    <div className="main-wrap">
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    goPage(`/install`);
                                }}
                            >
                                1. 설치 정보 입력
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    goPage(`/reception`);
                                }}
                            >
                                2. 간편 고장 접수
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
