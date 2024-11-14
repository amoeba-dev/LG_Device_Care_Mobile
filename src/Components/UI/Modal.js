import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import FocusTrap from "focus-trap-react";

import useCss from "@hook/useCss";

const Modal = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (!props?.noScollAction) {
            document.body.style.cssText = `
              position: fixed; 
              top: -${window.scrollY}px;
              overflow-y: scroll;
              width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = "";
                window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
            };
        }
    }, []);

    const wrapper = (
        <div id={props?.id} className="popup-wrapper show">
            <div className="dim">&nbsp;</div>
            <div className={props?.fullClassName ? props?.fullClassName : `popup ${props?.className || ""}`} role="dialog" aria-labelledby="popup-label" aria-modal="true">
                <div className="popup-container" id={`${props?.id}-container`}>
                    <div className="popup-header">
                        <h1 id="popup-label">{props?.title}</h1>
                        {props?.topClose && (
                            <button type="button" className="btn-close" onClick={props?.onClose}>
                                <span className="ir">{t("button.close")}</span>
                            </button>
                        )}
                    </div>
                    {props?.popupContentHeader || ""}

                    <div className="popup-content">{props?.children}</div>

                    {props?.popupContentFooter || ""}

                    {!props?.noFooter && (
                        <div className="popup-footer">
                            <div className="button-box double-button">
                                <button type="button" id="btn-st-cancel" className="btn btn-huge btn-tertiary" onClick={props?.onClose}>
                                    {t("button.cancel")}
                                </button>
                                <button
                                    type="button"
                                    id="btn-st-done"
                                    className={`btn btn-huge btn-secondary ${props?.okBtnClassName || ""}`}
                                    onClick={props?.onClick}
                                    disabled={props?.buttonOkDisabled}
                                    aria-live={props?.butonOkariaLive || ""}
                                >
                                    {props?.buttonOkTitle || t("distribution.label.completed")}
                                </button>
                            </div>
                        </div>
                    )}
                    {props?.ok && (
                        <div className="popup-footer">
                            <div className="button-box">
                                <button type="button" id="btn-fb-close" className="btn btn-huge btn-tertiary" onClick={props?.onClose}>
                                    {t("common.ok")}
                                </button>
                            </div>
                        </div>
                    )}
                    {props?.close && (
                        <div className="popup-footer">
                            <div className="button-box">
                                <button type="button" id="btn-fb-close" className="btn btn-huge btn-tertiary" onClick={props?.onClose}>
                                    {t("button.close")}
                                </button>
                            </div>
                        </div>
                    )}
                    {props?.customBtnText && (
                        <div className="popup-footer">
                            <div className="button-box">
                                <button type="button" id="btn-fb-close" className="btn btn-huge btn-tertiary" onClick={props?.onClick}>
                                    {props?.customBtnText}
                                </button>
                            </div>
                        </div>
                    )}
                    {props?.modify && (
                        <div className="popup-footer">
                            <div className="button-box">
                                <button type="button" id="btn-sf-modify" className="btn btn-huge btn-tertiary" onClick={props?.onClick} disabled={props?.buttonOkDisabled}>
                                    {t("common.label.modify")}
                                </button>
                                <button type="button" id="btn-sf-close" className="btn btn-huge btn-secondary" onClick={props?.onClose}>
                                    {t("button.close")}
                                </button>
                            </div>
                        </div>
                    )}
                    {props?.btnList && props?.btnList?.length > 0 && (
                        <div className="popup-footer">
                            <div className="button-box">
                                {props?.btnList?.map((item, index) => (
                                    <button type="button" id={`modal-btn-${index}`} className={`btn btn-huge ${item?.className || ""}`} onClick={item?.onClick} key={index}>
                                        {item?.btnText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return props?.noFocusTrap ? wrapper : <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: false, initialFocus: false }}>{wrapper}</FocusTrap>;
};

export default Modal;
