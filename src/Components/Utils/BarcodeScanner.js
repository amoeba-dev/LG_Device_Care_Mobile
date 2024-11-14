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
import BarcodeScannerComponent from "react-qr-barcode-scanner-17";

export default (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { saveInnerLoading } = useContext(AppContext);

    return (
        <Fragment>
            <div id="popup-QR-camera" className="popup-wrapper show">
                <div className="popup popup-alert-message" role="dialog" aria-labelledby="popup-label" aria-modal="true">
                    <div className="popup-container">
                        <div className="popup-header">
                            <h1 id="popup-label">{"설치정보 조회를 위해 제품의 바코드를 촬영해 주세요"}</h1>
                        </div>

                        <div className="popup-content">
                            <div className="camera-area">
                                <BarcodeScannerComponent
                                    onUpdate={(err, result) => {
                                        if (result?.text && props?.onChange) {
                                            props?.onChange(result?.text);
                                        }
                                    }}
                                    onError={(err) => {
                                        setData("err::" + err);
                                    }}
                                />
                            </div>
                            {/* <p>data3:: {data}</p> */}
                        </div>
                        <div className="popup-footer">
                            <div className="button-box">
                                <button
                                    type="button"
                                    id="btn-record"
                                    className="btn btn-tertiary"
                                    onClick={() => {
                                        if (props?.onClose) {
                                            props?.onClose();
                                        } else {
                                            navigate("/");
                                        }
                                    }}
                                >
                                    취소
                                </button>
                                {/* <button type="button" id="btn-skip" className="btn btn-tertiary">
                                    Skip
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
