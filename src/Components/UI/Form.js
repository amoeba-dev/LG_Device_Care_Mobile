import React, { Fragment, useEffect, useState, useRef, forwardRef, useContext } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import useScript from "@hook/useScript";
import "jquery-ui/ui/widgets/datepicker";
import qs from "query-string";
import _U from "@util/utilities";
import Calendar from "react-calendar";
import moment from "moment";
import { AppContext } from "@component/AppProvider";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";
import Dialog from "@component/UI/Dialog";

export const SelectBox = (props) => {
    const { t } = useTranslation();
    const { id, items, value, onChange, selectLabel, title, description, ariaLabelId, className, deleteBtn, onDelete, isRequired = false } = props;
    const { selectLabelClass, selectLabelEm, noItemText, disabled, ariadescribedby, noAtagAction, dropdownBottom, positionAction } = props;
    const { ariaLabel, dropScoll, typeClassName, editBtn, onEdit, onClick } = props;
    const [expand, setExpand] = useState(false);
    const [selectId, setSelectId] = useState("");
    const areaRef = useRef(null);
    const [addProperty, setAddProperty] = useState({});
    const [dropScrollClass, setDropScrollClass] = useState(false);

    const onChangeItem = (sId, item) => {
        console.log("sid, item", sId, item);
        if (selectLabel != item?.label) {
            setSelectId(sId);
            onChange && onChange(item);
        }
        setExpand(false);
    };

    const tabRef = useRef(null);
    const onTabAreaKeyDown = (e) => {
        // ArrowUp, ArrowDown, ArrowLeft, ArrowRight
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const tabList = tabRef.current.querySelectorAll("a");
            let idx = 0;
            _.some(tabList, (item, i) => {
                if (document.activeElement === item) {
                    idx = i + (e.key === "ArrowDown" ? 1 : -1);
                    return true;
                }
            });

            if (idx >= tabList.length - 1) {
                idx = tabList.length - 1;
            } else if (idx < 0) {
                idx = 0;
            }
            tabList[idx].focus();
        }
    };

    useEffect(() => {
        setDropScrollClass(dropScoll);
        if (selectLabel || selectLabel === 0) {
            for (let i = 0; i < items?.length; i++) {
                const item = items[i];
                if (item?.label == selectLabel) {
                    setSelectId(`${id || ""}-select-id-${i}`);
                    break;
                }
            }
        }
        if (ariaLabel) {
            const p = {
                "aria-label": ariaLabel,
            };
            setAddProperty(p);
        } else {
            const p = {
                "aria-labelledby": `${ariaLabelId || (id || "") + "-label-select"} ${selectId || ""}`,
            };
            setAddProperty(p);
        }
    }, []);

    useEffect(() => {
        function handleOutside(e) {
            // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
            if (areaRef.current && !areaRef.current.contains(e.target)) {
                setExpand(false);
            }
        }
        function handleKeyup(e) {
            if (e?.key === "Escape") {
                // document.activeElement.blur();
                setExpand(false);
            } else if (areaRef.current && !areaRef.current.contains(document.activeElement)) {
                setExpand(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("keyup", handleKeyup);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("keyup", handleKeyup);
        };
    }, [areaRef]);

    // useEffect(() => {
    //     if (expand && tabRef?.current && tabRef?.current?.childNodes?.length > 0) {
    //         const ulHeight = tabRef?.current?.clientHeight || 0;
    //         const liHeight = tabRef?.current?.childNodes?.[0]?.clientHeight || 0;
    //         const liCnt = tabRef?.current?.childNodes?.length || 0;
    //         console.log("tabRef", expand, ulHeight, liHeight, liHeight * liCnt, ulHeight + liCnt / 2);
    //         console.log(tabRef?.current?.childNodes?.[0]?.clientHeight);
    //         if (ulHeight + liCnt / 2 < liHeight * liCnt) {
    //             setDropScrollClass(false);
    //         } else {
    //             setDropScrollClass(true);
    //         }
    //     }
    // }, [expand]);

    return (
        <div className={`dropdown ${typeClassName ? typeClassName : "dropdown-type-a"} ${className || ""} ${disabled ? "disabled" : ""} ${dropdownBottom ? "dropdown-bottom" : ""}`} ref={areaRef}>
            <button
                type="button"
                role="listbox"
                aria-haspopup="listbox"
                className={`btn-dropdown ${selectLabelClass} ${disabled ? "disabled" : ""}`}
                aria-expanded={expand}
                aria-required={isRequired ? "true" : "false"}
                title={selectLabel && selectLabel !== "ㅤ" ? selectLabel : title}
                onClick={(e) => {
                    if (!disabled) {
                        if (onClick) {
                            onClick();
                        } else {
                            setExpand(!expand);
                        }
                    }
                }}
                onKeyDown={(e) => {
                    if (!disabled && e.key === "ArrowDown") {
                        if (!onClick) {
                            setExpand(!expand);
                            setTimeout(() => {
                                onTabAreaKeyDown(e);
                            }, 100);
                        }
                    }
                }}
                // aria-labelledby={`${ariaLabelId || (id || "") + "-label-select"} ${selectId || ""}`}
                aria-activedescendant={selectId}
                aria-describedby={ariadescribedby || ""}
                {...addProperty}
            >
                <div>
                    {selectLabelEm && <em>{selectLabelEm}</em>}
                    {selectLabel}
                </div>
            </button>
            <div className={cx({ "dropdown-menu": true, "list-delete": deleteBtn, "list-edit": editBtn })}>
                <ul className={cx({ lists: true, "drop-scoll": !dropScrollClass ? true : false })} role="listbox" aria-labelledby={ariaLabelId || (id || "") + "-label-select"} ref={tabRef}>
                    {items?.map((item, index) => {
                        if (!item) {
                            return "";
                        }
                        return (
                            <li className={`list ${item?.liClassName || ""}`} role="none presentation" key={index} style={item?.style}>
                                {noAtagAction ? (
                                    <Fragment>
                                        {item?.key && <span>{item?.key}</span>}
                                        {item?.em && <em>{item?.em}</em>}
                                        {item?.label}
                                    </Fragment>
                                ) : (
                                    <button
                                        type="button"
                                        id={`${id || ""}-select-id-${index}`}
                                        role={item?.role || "option"}
                                        aria-selected={value === item?.value ? "true" : "false"}
                                        onClick={() => onChangeItem(`${id || ""}-select-id-${index}`, item)}
                                        className={`menu-option ${item?.aClassName || ""}`}
                                        onKeyDown={onTabAreaKeyDown}
                                        tabIndex={-1}
                                    >
                                        {item?.key && <span>{item?.key}</span>}
                                        {item?.em && <em>{item?.em}</em>}
                                        {item?.label}
                                    </button>
                                )}
                                {editBtn && (
                                    <button type="button" className="btn-input-edit" onClick={() => onEdit && onEdit(item)}>
                                        <span className="ir">{t("common.label.edit.input")}</span>
                                    </button>
                                )}
                                {deleteBtn && (
                                    <button type="button" className="btn-input-remove" onClick={() => onDelete && onDelete(item)}>
                                        <span className="ir">{t("alertmsg.template.popup.delete_input")}</span>
                                    </button>
                                )}
                            </li>
                        );
                    })}
                    {(!items || items?.length === 0) && (
                        <li className="list" role="none presentation">
                            <a href="#!" role="option" aria-selected="false" onClick={() => setExpand(false)}>
                                {noItemText || noItemText == 0 ? noItemText : ""}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export const SelectBoxBasic = (props) => {
    const { items, value, onChange, id, empty, ariaLabel } = props;

    return (
        <div className="select-box">
            <select id={id} onChange={onChange} value={value} aria-label={ariaLabel}>
                {empty && <option value="">{empty}</option>}
                {items?.map((item, i) => (
                    <option value={item?.value} key={i}>
                        {item?.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

let _inputDatePickerTimer = null;

const months = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
];

const StyledCalenderContainer = styled.div`
    .react-calendar__navigation {
        display: none;
    }
`;
export const InputCalendar = ({
    params: paramsInProps,
    className = "from-date",
    id,
    name,
    placeholder,
    autoComplete,
    ariaLabel,
    value,
    onChange,
    minDate,
    calendarTitle = "Calendar View",
    ariaDescribedBy,
    ir,
    isRequired = false,
    typeClassName,
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateFormat, setDateFormat] = useState("YYYY-MM-DD");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [activeDate, setActiveDate] = useState(new Date());
    // const {
    //     auth: {
    //         user_info: { datetime_format },
    //     },
    // } = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");

    // useEffect(() => {
    //     if (datetime_format) setDateFormat(datetime_format.split(" ")[0]);
    // }, [datetime_format]);
    const calendarRef = useRef(null);

    const { t } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!calendarRef?.current?.contains(event?.target) && !event?.target?.classList?.contains("calendar_pop") && !event?.target?.closest(".calendar_pop")) {
                setShowCalendar(false);
            }
        };

        const onTabAreaKeyDown = (e) => {
            if (calendarRef?.current?.contains(e?.target)) {
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                    const tabList = calendarRef.current.querySelectorAll(".react-calendar__tile");
                    let idx = 0;
                    _.some(tabList, (item, i) => {
                        if (document.activeElement === item) {
                            idx = i + (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "ArrowDown" ? 7 : -7);
                            return true;
                        }
                    });

                    if (idx >= tabList.length - 1) {
                        idx = tabList.length - 1;
                    } else if (idx < 0) {
                        idx = 0;
                    }
                    tabList[idx].focus();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", onTabAreaKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", onTabAreaKeyDown);
        };
    }, []);

    useEffect(() => {
        if (showCalendar && value) {
            const vSplit = value.split("-");
            const year = parseInt(vSplit[0]);
            const month = parseInt(vSplit[1]);
            setCurrentYear(year);
            setCurrentMonth(month);
        }
        if (showCalendar) {
            calendarRef.current.querySelectorAll(".react-calendar__tile")?.forEach((f) => {
                f.tabIndex = "-1";
                f.setAttribute("aria-current", "false");
            });
            calendarRef.current.querySelectorAll(".react-calendar__tile--active")?.forEach((f) => {
                f.tabIndex = "0";
                f.setAttribute("aria-current", "true");
            });
        }
    }, [showCalendar]);

    useEffect(() => {
        setActiveDate(new Date(`${currentYear}-${currentMonth}-1`));
    }, [currentYear, currentMonth]);

    const handleDateChange = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        _U.gaEvent("DatePicker_", { date: formattedDate });
        onChange && onChange({ ...paramsInProps, [name]: formattedDate });
        setShowCalendar(false);
    };

    const onClickPrev = () => {
        if (currentMonth <= 1) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(12);
            return;
        }
        setCurrentMonth(currentMonth - 1);
    };

    const onClickNext = () => {
        if (currentMonth >= 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
            return;
        }
        setCurrentMonth(currentMonth + 1);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    //날짜 유효성 체크 (윤달 포함)
    const checkDate = (vDate) => {
        const vValue = vDate;
        const vValue_Num = vValue?.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리 합니다.

        //_fnToNull 함수는 아래 따로 적어두겠습니다.
        if (!vValue_Num) {
            return false;
        }

        //8자리가 아닌 경우 false
        if (vValue_Num?.length != 8) {
            return false;
        }

        //최소 날짜 체크
        if (minDate && moment(minDate).format("YYYYMMDD") > vValue_Num) {
            return false;
        }

        //8자리의 yyyymmdd를 원본 , 4자리 , 2자리 , 2자리로 변경해 주기 위한 패턴생성을 합니다.
        const rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/;
        const dtArray = vValue_Num?.match(rxDatePattern);

        if (dtArray == null) {
            return false;
        }

        //0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월) , 3번재는 dd(일) 입니다.
        const dtYear = dtArray[1];
        const dtMonth = dtArray[2];
        const dtDay = dtArray[3];

        //yyyymmdd 체크
        if (dtMonth < 1 || dtMonth > 12) {
            return false;
        } else if (dtDay < 1 || dtDay > 31) {
            return false;
        } else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
            return false;
        } else if (dtMonth == 2) {
            const isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
            if (dtDay > 29 || (dtDay == 29 && !isleap)) {
                return false;
            }
        }

        return true;
    };

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <div className={`datepicker-container ${className}`}>
            <label htmlFor={id}>
                <span className="ir">{ir}</span>
            </label>
            <div className="input-box">
                <input
                    type="text"
                    id={id}
                    name={name}
                    className="datepicker"
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-label={ariaLabel}
                    value={inputValue || ""}
                    onChange={(e) => {
                        let v = e?.target?.value;
                        v = _U.getOnlyNumber(v);
                        if (v) {
                            if (v?.length > 8) {
                                v = v?.substring(0, 8);
                            }
                            if (v?.length === 8) {
                                const check = checkDate(v);
                                if (check) {
                                    setInputValue(v?.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3"));
                                    onChange && onChange({ ...paramsInProps, [name]: v?.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3") });
                                } else {
                                    setInputValue("");
                                }
                            } else {
                                setInputValue(e?.target?.value);
                            }
                        } else {
                            setInputValue(v);
                        }
                    }}
                    // onClick={toggleCalendar}
                    // readOnly
                    aria-required={isRequired ? "true" : "false"}
                />
                <button type="button" className="ui-datepicker-trigger" aria-describedby={ariaDescribedBy} onClick={toggleCalendar}>
                    <img src="/assets/images/btn_icon_calendar.svg" alt={calendarTitle} title={calendarTitle} />
                </button>
            </div>
            {showCalendar && (
                <FocusTrap focusTrapOptions={{ escapeDeactivates: false }}>
                    <div className="calendar_pop display-block-style z-index-99" role="dialog" aria-modal="true" aria-label={calendarTitle}>
                        <div className="cal_header clearfix">
                            <div className="field field-type-dropdown field-flex">
                                <div className="field-form">
                                    <div className="field-box">
                                        <SelectBox
                                            id="calendar-select-month"
                                            items={months}
                                            value={currentMonth}
                                            selectLabel={currentMonth || ""}
                                            onChange={(item) => {
                                                const { value } = item;
                                                const isPlus = value > currentMonth;
                                                let loopTimes = 0;
                                                if (isPlus) {
                                                    loopTimes = value - currentMonth;
                                                    for (let i = 0; i < loopTimes; i++) {
                                                        const nextButton = document.querySelector(".react-calendar__navigation__next-button");
                                                        if (nextButton) nextButton.click();
                                                    }
                                                } else {
                                                    loopTimes = currentMonth - value;
                                                    for (let i = 0; i < loopTimes; i++) {
                                                        const prevButton = document.querySelector(".react-calendar__navigation__prev-button");
                                                        if (prevButton) prevButton.click();
                                                    }
                                                }
                                                setCurrentMonth(value);
                                            }}
                                            ariaLabel={t("subtext.desc.select.month")}
                                            typeClassName={typeClassName}
                                        />
                                    </div>
                                </div>

                                <div className="field-form">
                                    <div className="field-box">
                                        <SelectBox
                                            id="calendar-select-year"
                                            items={Array.from({ length: 21 }, (_, index) => {
                                                const year = currentYear - 10 + index;
                                                return { label: year, value: year };
                                            })}
                                            value={currentYear}
                                            selectLabel={currentYear || ""}
                                            onChange={(item) => {
                                                const { value } = item;
                                                setCurrentYear(value);
                                            }}
                                            ariaLabel={t("subtext.desc.select.year")}
                                            typeClassName={typeClassName}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cal_btnbox">
                                <a href="#!" role="button" className="btn-prev" onClick={onClickPrev}>
                                    <span className="ir">{t("common.label.move") + " " + t("common.button.prev.month.label")}</span>
                                </a>
                                <a href="#!" role="button" className="btn-next" onClick={onClickNext}>
                                    <span className="ir">{t("common.label.move") + " " + t("common.button.next.month.label")}</span>
                                </a>
                            </div>
                        </div>
                        <StyledCalenderContainer className="cal_content" ref={calendarRef}>
                            <Calendar
                                view={["year", "month", "decade", "century"]}
                                value={value}
                                onChange={handleDateChange}
                                minDate={minDate}
                                className="ev-calendar"
                                activeStartDate={activeDate}
                                locale="en-US"
                            />
                        </StyledCalenderContainer>
                    </div>
                </FocusTrap>
            )}
        </div>
    );
};

export const InputDatepicker = forwardRef(({ params: paramsInProps, id, name, placeholder, autoComplete, ariaLabel, value, onChange, calendarTitle = "Calendar View" }, ref) => {
    useScript("/assets/lib/date-picker.js");

    useEffect(() => {
        if (ref.current) {
            $(ref.current)
                .datepicker({
                    autoSize: true,
                    showOn: "button",
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: "yy-mm-dd",
                    buttonImage: "/assets/images/btn_icon_calendar.svg",
                    buttonImageOnly: false,
                    buttonText: calendarTitle,
                    dayNamesShort: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    showButtonPanel: true,
                    closeText: "Close",
                    onClose: () => {
                        $("#dp-container").removeAttr("aria-hidden");
                        $("#skipnav").removeAttr("aria-hidden");
                    },
                    onSelect: (d) => {
                        console.log("change");
                        $(ref.current).change();
                    },
                    onChange: (d) => {
                        console.log("change");
                    },
                    onChangeMonthYear: () => {
                        setTimeout(() => {
                            $(".ui-datepicker-month")[0].focus();
                        }, 10);
                    },
                })
                .on("change", () => {
                    if (_inputDatePickerTimer) {
                        clearTimeout(_inputDatePickerTimer);
                        _inputDatePickerTimer = null;
                    }
                    _inputDatePickerTimer = setTimeout(() => {
                        onChange && onChange({ ...paramsInProps, [name]: $(ref.current).val() });
                        _inputDatePickerTimer = null;
                    }, 100);
                });
        }
        return () => {
            if (ref.current) {
                $(ref.current).datepicker("destroy");
            }
        };
    }, [ref, paramsInProps]);

    useEffect(() => {
        if (!value && ref && ref?.current) {
            $(ref.current).val("");
        }
    }, [ref, value]);

    return <input type="text" id={id} name={name} className="datepicker" placeholder={placeholder} autoComplete={autoComplete} aria-label={ariaLabel} value={value || ""} ref={ref} readOnly />;
});

const isNotNumber = (value) => {
    const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    return regExp.test(value);
};

export const NumberInput = ({ isRequired = false, autoComplete = false, min = 0, max = 100, id, value, onChange, descId, desc, title }) => {
    const { t } = useTranslation();
    const exceptThisSymbols = ["e", "E", "+", "-", "."];
    return (
        <div className={`field field-type-message ${isRequired ? "required" : ""}`}>
            <div className="field-header">
                <label htmlFor={id} className="field-title">
                    {title}
                </label>
            </div>
            <div className="field-form">
                <div className="input-box">
                    <input
                        type="text"
                        id={id}
                        value={value}
                        min={min}
                        max={max}
                        onKeyDown={(e) => {
                            const keyCode = e.keyCode || e.which;
                            if (keyCode >= 37 && keyCode <= 40) {
                                return;
                            }
                            if (e.key.length === 1 && e.key.charCodeAt(0) > 127) {
                                e.preventDefault();
                            }
                            if (exceptThisSymbols.includes(e.key)) e.preventDefault();
                        }}
                        onPaste={(e) => {
                            e.preventDefault();
                            const clipboardData = e.clipboardData || window.clipboardData;
                            const pastedText = clipboardData.getData("text");
                            const filteredText = pastedText.replace(/[^\d]/g, "");
                            const parsedValue = filteredText === "" ? "" : parseInt(filteredText, 10);
                            const clampedValue = filteredText === "" ? "" : Math.min(Math.max(parsedValue, min), max);
                            onChange(clampedValue);
                        }}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(/[^0-9]/g, "");
                            console.log(inputValue);
                            const parsedValue = inputValue === "" ? "" : parseInt(inputValue, 10); // 숫자로 변환
                            const clampedValue = inputValue === "" ? "" : Math.min(Math.max(parsedValue, min), max); // 값 클램프
                            onChange(clampedValue);
                        }}
                        autoComplete={autoComplete ? "true" : "false"}
                        aria-required={isRequired ? "true" : "false"}
                        aria-invalid="true"
                        aria-describedby={descId}
                    />

                    <button type="button" className="btn-input-remove hide">
                        <span className="ir">{t("alertmsg.template.popup.delete_input")}</span>
                    </button>
                </div>
            </div>
            {desc && (
                <span id={descId} className="field-description">
                    {desc}
                </span>
            )}
        </div>
    );
};

export const VolumeInput = ({ isRequired = false, autoComplete = false, min = 0, max = 100, id, value, onChange, descId, title, placeholder = "0" }) => {
    const { t } = useTranslation();
    const exceptThisSymbols = ["e", "E", "+", "-", "."];
    return (
        <div className={`field field-type-message ${isRequired ? "required" : ""}`}>
            <div className="field-header">
                <label htmlFor={id} className="field-title">
                    {title ? title : t("player.label.volume")}
                </label>
            </div>
            <div className="field-form">
                <div className="input-box">
                    <input
                        placeholder={placeholder}
                        type="text"
                        id={id}
                        value={value}
                        min={min}
                        max={max}
                        onKeyDown={(e) => {
                            const keyCode = e.keyCode || e.which;
                            if (keyCode >= 37 && keyCode <= 40) {
                                return;
                            }
                            if (e.key.length === 1 && e.key.charCodeAt(0) > 127) {
                                e.preventDefault();
                            }
                            if (exceptThisSymbols.includes(e.key)) e.preventDefault();
                        }}
                        onPaste={(e) => {
                            e.preventDefault();
                            const clipboardData = e.clipboardData || window.clipboardData;
                            const pastedText = clipboardData.getData("text");
                            const filteredText = pastedText.replace(/[^\d]/g, "");
                            const parsedValue = filteredText === "" ? "" : parseInt(filteredText, 10);
                            const clampedValue = filteredText === "" ? "" : Math.min(Math.max(parsedValue, min), max);
                            onChange(clampedValue);
                        }}
                        onChange={(e) => {
                            const inputValue = e.target.value.replace(/[^0-9]/g, "");
                            const parsedValue = inputValue === "" ? "" : parseInt(inputValue, 10); // 숫자로 변환
                            const clampedValue = inputValue === "" ? "" : Math.min(Math.max(parsedValue, min), max); // 값 클램프
                            onChange(clampedValue);
                        }}
                        autoComplete={autoComplete ? "true" : "false"}
                        aria-required={isRequired ? "true" : "false"}
                        aria-invalid="true"
                        aria-describedby={descId}
                    />

                    <button type="button" className={cx({ "btn-input-remove": true, hide: value != "0" && !value ? true : false })} onClick={() => onChange("")}>
                        <span className="ir">{t("alertmsg.template.popup.delete_input")}</span>
                    </button>
                </div>
            </div>
            <span id={descId} className="field-description">
                {t("alertmsg.popup.field_guide.2")}
            </span>
        </div>
    );
};

export const TextInput = (props) => {
    const { t } = useTranslation();
    const { isRequired = false, removeButton = false, wordCount = false, description = false, autoComplete = "false", invalid = false } = props;
    const { title, id, value = "", onChange, maxLength = 0, placeholder = "" } = props;
    const { tailButtonList } = props;
    return (
        <div className={`field field-type-input field-flex ${isRequired ? "required" : ""}`}>
            {title && (
                <label htmlFor={id} className="field-label">
                    {title}
                </label>
            )}
            <div className="field-form">
                <div className="field-box">
                    <div className="input-box">
                        <input
                            type="text"
                            id={id}
                            value={value}
                            onChange={(e) => {
                                const value = e?.target?.value || "";
                                const truncatedValue = maxLength > 0 ? value?.slice(0, maxLength) : value;
                                onChange(truncatedValue || "");
                            }}
                            autoComplete={autoComplete}
                            aria-required={isRequired ? "true" : "false"}
                            aria-invalid={invalid}
                            aria-describedby={description ? `description-${id}` : ""}
                            placeholder={placeholder}
                        />
                        {removeButton && (
                            <button type="button" className={`btn-input-remove ${value || value == "0" ? "" : "hide"}`} onClick={() => onChange("")}>
                                <span className="ir">{t("alertmsg.template.popup.delete_input")}</span>
                            </button>
                        )}
                    </div>
                    {tailButtonList?.length > 0 &&
                        tailButtonList?.map((item, index) => (
                            <button key={index} className={`btn ${item?.className}`} onClick={() => item?.onClick()}>
                                {item?.label}
                            </button>
                        ))}
                </div>
                {wordCount && maxLength > 0 && (
                    <div className="word-count">
                        ({value.length}/{maxLength})
                    </div>
                )}
                {description && (
                    <span id={`description-${id}`} className="field-description ir">
                        {description}
                    </span>
                )}
            </div>
        </div>
    );
};

export const TextArea = ({ isRequired = false, title, id, value = "", onChange, maxLength = 100, placeholder = "", hideWordCount = false }) => {
    const { t } = useTranslation();
    return (
        <div className={`field field-type-textarea ${isRequired ? "required" : ""}`}>
            {title && (
                <div className="field-header">
                    <label htmlFor={id} className="field-title">
                        {title}
                    </label>
                </div>
            )}
            <div className="field-form">
                <div className="field-box margin-0-style">
                    <textarea
                        name={id}
                        id={id}
                        aria-required={isRequired ? "true" : "false"}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            const value = e?.target?.value;
                            const truncatedValue = value?.slice(0, maxLength);
                            onChange(truncatedValue || value);
                        }}
                    ></textarea>
                </div>
                {!hideWordCount && (
                    <div className="word-count">
                        ({value.length}/{maxLength})
                    </div>
                )}
            </div>
        </div>
    );
};

export const RadioBox = (props) => {
    const { items, value, onChange, name, title } = props;

    return (
        <Fragment>
            <div className="field field-type-radio">
                <h3 className="field-label">{title}</h3>
                <div className="field-form">
                    <div className="field-box">
                        {items?.map((item, index) => (
                            <div className="radio" key={index}>
                                <input type="radio" name={name} id={name + "_" + index} checked={item?.value === value} onChange={() => onChange(item)} />
                                <label htmlFor={name + "_" + index}>{item?.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export const TextInputSingle = (props) => {
    const { t } = useTranslation();
    const { isRequired = false, removeButton = false, wordCount = false, description = false, autoComplete = "false", invalid = false } = props;
    const { title, id, value = "", onChange, maxLength = 0, placeholder = "" } = props;
    const { onValidationReplace } = props;

    return (
        <div className="input-box">
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => {
                    const value = e?.target?.value || "";
                    let truncatedValue = maxLength > 0 ? value?.slice(0, maxLength) : value;
                    if (onValidationReplace) {
                        truncatedValue = onValidationReplace(truncatedValue);
                    }
                    onChange(truncatedValue || "");
                }}
                autoComplete={autoComplete}
                aria-required={isRequired ? "true" : "false"}
                aria-invalid={invalid}
                aria-describedby={description ? `description-${id}` : ""}
                placeholder={placeholder}
            />
            {removeButton && (
                <button type="button" className={`btn-input-remove ${value || value == "0" ? "" : "hide"}`} onClick={() => onChange("")}>
                    <span className="ir">{t("alertmsg.template.popup.delete_input")}</span>
                </button>
            )}
            {description && (
                <span id={`description-${id}`} className="field-description ir">
                    {description}
                </span>
            )}
        </div>
    );
};

export const FileInputPreBtn = (props) => {
    const { t } = useTranslation();
    const { description = false, accept, acceptFileFormat } = props;
    const { title, preBtnLabel, id, value = "", onChange, placeholder = "" } = props;

    const fileSelected = (e) => {
        if (e?.target?.files?.length > 0) {
            const checkFile = e?.target?.files[0];

            const fileName = checkFile?.name;
            const ext = fileName?.split(".")?.pop()?.toLowerCase();
            if (acceptFileFormat && !acceptFileFormat.includes(ext)) {
                //
                Dialog({
                    title: t("popup.title.inform"),
                    text: t("content.msg.fileformat"),
                    button: t("common.ok"),
                }).then((id) => {
                    if (id) {
                    }
                });
            } else {
                onChange && onChange(fileName);
            }
        }
    };
    return (
        <div className="field field-type-input field-flex">
            <h3 className="field-label">{title}</h3>
            <div className="field-form">
                <div className="field-box">
                    <div className="input-box">
                        <div className="filebox">
                            <label htmlFor={id} role="button">
                                {preBtnLabel}
                            </label>
                            <input className="front-name upload-name" value={value} disabled placeholder={placeholder} aria-describedby={description ? `description-${id}` : ""} />
                            <input
                                type="file"
                                id={id}
                                className="hide"
                                accept={accept}
                                onChange={(e) => {
                                    fileSelected(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                {description && (
                    <span id={`description-${id}`} className="field-description ir">
                        {description}
                    </span>
                )}
            </div>
        </div>
    );
};
