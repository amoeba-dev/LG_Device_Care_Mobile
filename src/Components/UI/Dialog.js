/* eslint-disable */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import cx from "classnames";
import FocusTrap from "focus-trap-react";
import { useTranslation } from "react-i18next";

import { ThemeProvider, Theme } from "@component/GlobalStyles";
import useCss from "@hook/useCss";

const _CONTAINER_ID = "LGE-DIALOG-CONTAINER";
let _CONTAINER = null;

export default (props) => {
    if (!_CONTAINER) {
        _CONTAINER = document.getElementById(_CONTAINER_ID);
    }
    if (!_CONTAINER) {
        _CONTAINER = document.createElement("div");
        _CONTAINER.id = _CONTAINER_ID;
        document.body.appendChild(_CONTAINER);
    }

    return new Promise((resolve, reject) => {
        try {
            ReactDOM.render(<Dialog {...props} resolve={resolve} reject={reject} />, _CONTAINER);
        } catch (e) {
            reject(e);
        }
    });
};

const Dialog = (props) => {
    const { t } = useTranslation();
    const { resolve, reject } = props || {};
    const { title, text, html, body, button, isFull, noScroll } = props || {};
    const [active, setActive] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);

    const dismiss = () => {
        setActive(false);
        //paraent scoll 차단 해제 : 열린 모달이 없을때
        if (document.querySelectorAll(".popup-wrapper.show")?.length === 0) {
            const scrollY = document.body.style.top;
            document.body.style.cssText = "";
            window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        }
        document.body.removeChild(_CONTAINER);
        _CONTAINER = null;
        window.scrollTo(0, scrollPosition);
    };

    const handleClose = () => {
        dismiss();
        resolve && resolve();
    };

    const handleConfirmClick = () => {
        setActive(false);
        dismiss();
        resolve && resolve(true);
    };
    const handleButtonClick = (index) => {
        setActive(false);
        dismiss();
        if (index === button.length - 1) {
            resolve && resolve(true);
        } else {
            resolve && resolve(index);
        }
    };

    const handleOnResolve = (args) => {
        setActive(false);
        dismiss();
        resolve(args);
    };

    const handleOnReject = (args) => {
        setActive(false);
        dismiss();
        reject(args);
    };

    useEffect(() => {
        setScrollPosition(window.scrollY);
        if (document.getElementById("noticeDetail")) {
            setTimeout(() => {
                console.log("noticeDetail", document.getElementById("noticeDetail").scrollTop);
                document.getElementById("noticeDetail").scrollTop = 0;
            }, 100);
        }
        if (props?.isScollAction) {
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

    return (
        <FocusTrap
            active={active}
            focusTrapOptions={{
                escapeDeactivates: false,
                returnFocusOnDeactivate: false,
                initialFocus: false,
            }}
        >
            <div ref={props?.modalRef}>
                <ThemeProvider theme={Theme}>
                    <Container className={`popup-wrapper`} role="dialog" aria-modal="true">
                        <div className="dim">&nbsp;</div>
                        <div onClick={(e) => e.stopPropagation()} className={cx({ popup: true, full: isFull, "no-scroll": noScroll, ...props?.popupClassName })}>
                            <div className="popup-container">
                                {title && (
                                    <div className="popup-header">
                                        <h2 id="popup-label-title" className="popup-title">
                                            {title}
                                        </h2>
                                    </div>
                                )}

                                <div className="popup-content" aria-labelledby="popup-label-title">
                                    {text && <div className="description whitespace-pre-line">{text}</div>}
                                    {html && <div className="description" dangerouslySetInnerHTML={{ __html: html }} />}
                                    {body && React.cloneElement(body, { resolve: handleOnResolve, reject: handleOnReject })}
                                </div>
                                <div className="popup-footer" aria-labelledby="popup-label-title">
                                    <ButtonWrapper className={cx({ "button-box": true, "double-button": typeof button === "object" && button.length === 2 })}>
                                        {button && (typeof button === "boolean" || typeof button === "string") && (
                                            <button type="button" onClick={handleConfirmClick} className="btn btn-huge btn-tertiary">
                                                {typeof button === "string" ? button : t("common.ok")}
                                            </button>
                                        )}
                                        {button &&
                                            typeof button === "object" &&
                                            button.map((b, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={handleButtonClick.bind(this, i)}
                                                    className={cx({ btn: true, "btn-huge": button.length < 3, "btn-tertiary": i < button.length - 1, "btn-secondary": i === button.length - 1 })}
                                                >
                                                    {b}
                                                </button>
                                            ))}
                                    </ButtonWrapper>
                                </div>
                            </div>
                        </div>
                    </Container>
                </ThemeProvider>
            </div>
        </FocusTrap>
    );
};

/**
 * Styled
 */

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.15);
    z-index: 10001;
    display: block;

    /* display: flex;
    align-items: center;
    justify-content: center; */
`;

const ButtonWrapper = styled.div``;
