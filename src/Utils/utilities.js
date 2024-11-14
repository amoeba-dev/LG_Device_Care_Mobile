import React from "react";
import moment from "moment";
import _API from "@util/api";
import ApkParser from "app-info-parser/src/apk";
import ReactGA from "react-ga4";
import Dialog from "@component/UI/Dialog";
import _CodeInfo from "@util/codeInfo";
import _CK from "@util/cookie";

const utils = {};

utils.encode = (o) => {
    return btoa(encodeURIComponent(JSON.stringify(o)));
};

utils.decode = (str) => {
    return JSON.parse(decodeURIComponent(atob(str)));
};

utils.hightlight = (str, keyword) => {
    if (keyword) {
        //하이라이트 처리
        return str;
    }
    return str;
};

utils.kbSizeParse = (kb) => {
    if (kb >= 1024 * 1024) {
        // GB로 변환
        const gbSize = (kb / (1024 * 1024)).toFixed(2);
        return `${gbSize}GB`;
    } else if (kb >= 1024) {
        // MB로 변환
        const mbSize = (kb / 1024).toFixed(2);
        return `${mbSize}MB`;
    } else {
        // KB로 그대로 표시
        return `${kb}KB`;
    }
};

utils.byteSizeParse = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) {
        // GB로 변환
        const gbSize = (bytes / (1024 * 1024 * 1024)).toFixed(2);
        return `${gbSize}GB`;
    } else if (bytes >= 1024 * 1024) {
        // MB로 변환
        const mbSize = (bytes / (1024 * 1024)).toFixed(2);
        return `${mbSize}MB`;
    } else if (bytes >= 1024) {
        // KB로 변환
        const kbSize = (bytes / 1024).toFixed(2);
        return `${kbSize}KB`;
    } else {
        // 바이트로 그대로 표시
        return `${bytes} bytes`;
    }
};

utils.getCurrentYearAndMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    return { year, month };
};

utils.formatUnixTimeDate = (number, type) => {
    const date = new Date(number * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    if (type === 0) {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else if (type === 1) {
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
};

utils.formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

utils.formatDateByType = (dateString, type) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    if (type === 0) {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else if (type === 1) {
        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
};

utils.formatYYYYMMDD = (dateString, splitS = ".") => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${splitS}${month}${splitS}${day}`;
};

utils.postMessage = (code, data) => {
    window.postMessage(JSON.stringify({ code: code, data: data }), window.location.origin);
};

utils.parseMessage = (e) => {
    return new Promise((resolve, reject) => {
        if (!e.data) {
            reject && reject();
            return;
        }
        let data = null;
        try {
            data = typeof e.data === "string" && e.data.startsWith("{") ? JSON.parse(e.data) : e.data;
        } catch (e) {
            reject && reject();
            return;
        }
        try {
            if (data && data.code) {
                resolve && resolve(data);
            }
        } catch (e) {
            reject && reject(e);
        }
    });
};

utils.getExpireTime = (unix) => {
    const date = moment.duration(moment.unix(unix).diff(moment()));
    return { min: date.hours() === 1 ? 60 : date.minutes(), sec: date.hours() === 1 ? 0 : date.seconds() };
};

utils.checkEmailAddress = (address) => {
    if (!address) return false;
    /**
     * HTML5 Basic Email Validation
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
     * https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
     */
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    // return regex.test(address);
    return emailRegex.test(address);
};

utils.number3Comma = (val) => {
    if (val || val === 0) {
        val = (val + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return val;
};

utils.getFilename = (file) => {
    if (!file) return "";
    const fileKeyParts = file.split("/");
    const name = fileKeyParts[fileKeyParts.length - 1];
    return name;
};

utils.getDday = (date) => {
    let days = moment.duration(moment(date).diff(moment())).asDays();
    days = Math.ceil(days);
    if (days > 0) {
        days = "-" + utils.number3Comma(days);
    } else {
        days = "+" + utils.number3Comma(days);
    }

    if (isNaN(days)) {
        return "";
    }

    return `(D${days})`;
};

utils.getConnectionStatusList = (t) => {
    return [
        { label: t("common.label.connected"), value: "connected" },
        { label: t("setup.troubleNotice.label.nosignal"), value: "connected_no_signal" },
        { label: t("player.label.energySaving.screenOff"), value: "disconnected_screen_off" },
        { label: t("common.label.disconnected"), value: "disconnected" },
    ];
};

utils.downloadRemoteAccessFile = async (os_type, idx, t, deviceControlRef, saveDeviceControl, saveInnerLoading) => {
    const currentDate = moment().format("HHmmssSS");
    let sessionKey = "";
    if (os_type === "ANDROID") {
        sessionKey = "DIGITAL_SIGNAGE_TERMINAL:" + currentDate;
    } else {
        sessionKey = "DIGITAL_SIGNAGE_REMOTE_CONTROL:" + currentDate;
    }
    document.title = sessionKey;
    const params = [{ remoteControl: { data: { value: currentDate } } }];
    await utils.socketResponseDeviceControl([idx], params, null, null, false, false, null, null, deviceControlRef, saveDeviceControl, saveInnerLoading, t);
    const url = `${process.env.STATIC_URL ?? "https://lgcc.lgbusinesscloud.com"}/download/${_.get(process, "env.LAUNCHERV", "LauncherV_kr.exe")}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "LauncherV.exe");
    document.body.appendChild(link);
    link.click();

    //Dialog({ title: t("popup.title.inform"), text: obj[0]?.result ? t("common.msg.apply.success") : t("common.msg.apply.fail"), button: "Close" });
    // setTimeout(() => {
    //     document.title = "LG ConnectedCare";
    // }, [1000]);
};

utils.getOnlyNumber = (val) => {
    if (!val) return val;
    return (val + "").replace(/[^0-9]/g, "");
};

utils.getOnlyNumberDot = (val) => {
    if (!val) return val;
    const newVal = (val + "").replace(/[^0-9.]/g, "");
    if (newVal.startsWith(".")) {
        return "0" + newVal;
    } else {
        return newVal;
    }
};
utils.getOnlyNumberMinus = (val) => {
    if (!val || val == "0") return val;
    const newVal = (val + "").replace(/[^-0-9]/g, "");
    if (newVal.startsWith("-")) {
        return "-" + newVal.replace(/[^0-9]/g, "");
    } else {
        return newVal.replace(/[^0-9]/g, "");
    }
};

utils.searchTextBold = (searchText, data) => {
    let result = data;
    if (searchText && typeof data !== "object" && data) {
        const replaceValue = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${replaceValue})`, "igm");
        result = <span dangerouslySetInnerHTML={{ __html: data.toString().replace(regex, "<b class='color-red'>$1</b>") }} />;
    }
    return result;
};

utils.getOsType = (t, code) => {
    let result = data;
    if (searchText && typeof data !== "object" && data) {
        const replaceValue = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${replaceValue})`, "igm");
        result = <span dangerouslySetInnerHTML={{ __html: data.toString().replace(regex, "<b class='color-red'>$1</b>") }} />;
    }
    return result;
};

utils.getAuthWriteDisable = (rolePermission, service) => {
    const exceptRoleList = ["/redirect", "/nolicense", "/qr_regist", "/administration/license"];
    let disabled = true;
    if (rolePermission) {
        let myPath = window.location.pathname;
        if (!myPath) {
            myPath = "/dashboard/devices";
        }
        let checkRole = service || myPath.split("/")[1];
        if (!checkRole) {
            checkRole = "dashboard";
        }
        // console.log("service", service, myPath, rolePermission[checkRole], !exceptRoleList.includes(myPath), !rolePermission[checkRole] || rolePermission[checkRole] < 2);
        // !exceptRoleList.includes(myPath) &&
        if (rolePermission[checkRole] && rolePermission[checkRole] > 1) {
            disabled = false;
        }
    }
    return disabled;
};

utils.toHex = (num) => {
    const hexArray = [];
    while (num > 0) {
        const digit = num % 16;
        hexArray.unshift(digit >= 10 ? String.fromCharCode(digit + 55) : String(digit));
        num = Math.floor(num / 16);
    }
    return hexArray.join("");
};

utils.getOffsetTime = (auth, workspace, time, format) => {
    try {
        const dateFormat = auth?.user_info?.datetime_format;
        const addType = workspace?.utc_offset?.substring(0, 1);
        const minutes = parseInt(workspace?.utc_offset?.substring(1, 3)) * 60 + parseInt(workspace?.utc_offset?.substring(4, 6));
        const addMinutes = minutes * (addType === "+" ? 1 : -1);
        const localOffsetMinute = new Date().getTimezoneOffset();
        // moment를 쓰면 기본적으로 local time zone 으로 변환 되므로
        // local 시간을 utc0로 변환 후 workspace offset 값으로 변환
        return moment(time)
            .add(localOffsetMinute, "minutes")
            .add(addMinutes, "minutes")
            .format(format || dateFormat);
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getLocalTimeToOffsetTimestamp = (auth, workspace, timeStamp, format) => {
    try {
        const dateFormat = auth?.user_info?.datetime_format;
        const addType = workspace?.utc_offset?.substring(0, 1);
        const minutes = parseInt(workspace?.utc_offset?.substring(1, 3)) * 60 + parseInt(workspace?.utc_offset?.substring(4, 6));
        const addMinutes = minutes * (addType === "+" ? -1 : 1);
        const localOffsetMinute = new Date().getTimezoneOffset();
        // timestamp의 local time zone의 시간이 되는 offset timestamp
        if (format === "setting") {
            return moment(timeStamp).add(-localOffsetMinute, "minutes").add(addMinutes, "minutes").format(dateFormat);
        } else {
            return moment(timeStamp).add(-localOffsetMinute, "minutes").add(addMinutes, "minutes");
        }
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getOffsetTimeUnix = (auth, workspace, time) => {
    try {
        const addType = workspace?.utc_offset?.substring(0, 1);
        const minutes = parseInt(workspace?.utc_offset?.substring(1, 3)) * 60 + parseInt(workspace?.utc_offset?.substring(4, 6));
        const addMinutes = minutes * (addType === "+" ? 1 : -1);
        const localOffsetMinute = new Date().getTimezoneOffset();
        // moment를 쓰면 기본적으로 local time zone 으로 변환 되므로
        // local 시간을 utc0로 변환 후 workspace offset 값으로 변환
        return moment(time).add(localOffsetMinute, "minutes").add(addMinutes, "minutes").valueOf();
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getLocalTimeToUtc0Time = (auth, time, format) => {
    try {
        const dateFormat = auth?.user_info?.datetime_format;
        const localOffsetMinute = new Date().getTimezoneOffset();
        // moment를 쓰면 기본적으로 local time zone 으로 변환 되므로
        // local 시간을 utc0로 변환
        return moment(time)
            .add(localOffsetMinute, "minutes")
            .format(format || dateFormat);
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getOffsetTimeToUtc = (workspace, time, format) => {
    try {
        // moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).add(540, "minute").add(-120, "minute").valueOf();
        const addType = workspace?.utc_offset?.substring(0, 1);
        const minutes = parseInt(workspace?.utc_offset?.substring(1, 3)) * 60 + parseInt(workspace?.utc_offset?.substring(4, 6));
        const addMinutes = minutes * (addType === "+" ? -1 : 1);
        const localOffsetMinute = new Date().getTimezoneOffset();
        // moment를 쓰면 기본적으로 local time zone 으로 변환 되므로
        // local 시간을 utc0로 변환 후 workspace offset 값으로 변환
        return moment(time)
            .add(-localOffsetMinute, "minutes")
            .add(addMinutes, "minutes")
            .utc()
            .format(format || "");
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getLocaleTimeToUtc0Format = (time) => {
    try {
        //입력된 시간을 utc0시간인것으로 출력
        const localOffsetMinute = new Date().getTimezoneOffset();
        return moment(time).add(-localOffsetMinute, "minutes").utc().format();
    } catch (e) {
        console.log("convertPropertyTimeOffset error", e);
        return time;
    }
};

utils.getUtc0StringToOffsetTime = (auth, workspace, time, format) => {
    //utc0 기준 string을 property offset time으로 변경 : time - 2024-06-11 04:50:35 > offset  +09:00 : 2024-06-11 13:50:35
    try {
        const dateFormat = auth?.user_info?.datetime_format;
        const addType = workspace?.utc_offset?.substring(0, 1);
        const minutes = parseInt(workspace?.utc_offset?.substring(1, 3)) * 60 + parseInt(workspace?.utc_offset?.substring(4, 6));
        const addMinutes = minutes * (addType === "+" ? 1 : -1);
        return moment(time)
            .add(addMinutes, "minutes")
            .format(format || dateFormat);
    } catch (e) {
        console.log("getUtc0StringToOffsetTime error", e);
        return time;
    }
};

utils.checkFileName = (fileName) => {
    // ASCII character ranges 00–1F hex (0–31 decimal) and 7F (127 decimal)
    // * Non-printable ASCII characters (128–255 decimal characters)
    const reg = /[ \{\}\[\]\/?,;:|\*~`^\+<>@\#$%&\\\=\'\"]/gi;
    const regex = /^[a-zA-Z0-9_\-().]*$/;
    if (fileName && fileName.length > 0) {
        if (fileName.length > 100) {
            return -2;
        }
        // if (!regex.test(fileName)) {
        //     return -1;
        // }
        if (fileName.length !== fileName.replace(reg, "").length) {
            return -1;
        }
        for (let i = 0; i < fileName.length; i++) {
            const chrTemp = fileName.charCodeAt(i);
            if ((chrTemp >= 0 && chrTemp <= 31) || (chrTemp >= 128 && chrTemp <= 255) || chrTemp === 127) {
                return -1;
            }
        }
    }
    return 1;
};

utils.checkFileName2 = (fileName) => {
    //파일박스의 피해야 하는 문자만 체크
    const reg = /[ \{\}\[\]\/?,;:|\*~`^\+<>@\#$%&\\\=\'\"]/gi;
    if (fileName && fileName.length > 0) {
        if (fileName.length > 100) {
            return -2;
        }
        if (fileName.length !== fileName.replace(reg, "").length) {
            return -1;
        }
        for (let i = 0; i < fileName.length; i++) {
            const chrTemp = fileName.charCodeAt(i);
            if (chrTemp >= 128 && chrTemp <= 255) {
                return -1;
            }
        }
    }
    return 1;
};

utils.checkFileName3 = (fileName) => {
    // firmware 파일은 공백을 _ 로 변경해서 업로드 하므로 일단 파일 선택 시 공백 허용
    const reg = /[\{\}\[\]\/?,;:|\*~`^\+<>@\#$%&\\\=\'\"]/gi;
    const regex = /^[a-zA-Z0-9_\-().]*$/;
    if (fileName && fileName.length > 0) {
        if (fileName.length > 100) {
            return -2;
        }
        // if (!regex.test(fileName)) {
        //     return -1;
        // }
        if (fileName.length !== fileName.replace(reg, "").length) {
            return -1;
        }
        for (let i = 0; i < fileName.length; i++) {
            const chrTemp = fileName.charCodeAt(i);
            if ((chrTemp >= 0 && chrTemp <= 31) || (chrTemp >= 128 && chrTemp <= 255) || chrTemp === 127) {
                return -1;
            }
        }
    }
    return 1;
};

/**
 * 파일 다운로드 url 조회
 *
 * @author 오승현
 * @param {string} fileKey - 파일 고유 Key값
 * @param {number} expires_in_minutes - 다운로드 링크 유효시간 (default: 5)
 * @return {string} 파일 다운로드 url
 */
utils.getFileDownloadUrl = async (fileKey, expires_in_minutes = 5) => {
    try {
        const res = await _API.get({
            path: "/content/filebox/files/download-token",
            data: { file_path: fileKey, expires_in_minutes },
        });
        const {
            result: { url },
        } = res?.data;
        if (url) return url;
        else return "";
    } catch (error) {
        console.error("Error downloading file:", error);
        return "";
    }
};

/**
 * 오디오 파일의 재생시간을 반환
 *
 * @author 오승현
 * @param {string} fileKey - 파일 고유 Key값
 * @return {number} 오디오 재생시간
 */
utils.getDuration = async (fileKey) => {
    try {
        const url = await utils.getFileDownloadUrl(fileKey);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const durationInSeconds = parseInt(audioBuffer.duration);
        return durationInSeconds;
    } catch (error) {
        console.error("Error downloading or processing audio file:", error);
        throw error;
    }
};

/**
 * 해당 APK 파일의 Package Name 반환
 *
 * @author 오승현
 * @param {File} file - apk 파일
 * @return {string} 패키지명
 */
utils.getPackageName = async (file) => {
    try {
        const parser = await new ApkParser(file);
        const apkInfo = await parser.parse();
        console.log(apkInfo);
        return apkInfo.package;
    } catch (error) {
        console.error("Error parsing APK:", error);
        return "";
    }
};

utils.checkIpForm = (ip_addr) => {
    const filter = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if (!ip_addr || filter.test(ip_addr) == true) {
        return false;
    } else {
        return true;
    }
};

utils.gaEvent = (action, params) => {
    const cookie_policy_yn = _CK.get("cookie_policy_yn") || "N";
    let cookieSettings = _CK.get("CookieSettings");
    const analytics =
        cookieSettings && typeof cookieSettings === "string" ? JSON.parse(cookieSettings)?.analytics : cookieSettings && typeof cookieSettings === "object" ? cookieSettings?.analytics : true;

    if (cookie_policy_yn !== "Y" || analytics) {
        if (process.env.GOOGLE_ANALYTICS_TRACK_ID) {
            try {
                ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACK_ID);

                if (params) {
                    ReactGA.event(action, params);
                    // ##event_category, event_label로 매개변수 설정해야할떄##
                    // let category = Object.entries(params)[0][0];
                    // let label = Object.entries(params)[0][1];
                    // ReactGA.event(action, {
                    //     category,
                    //     label,
                    // });
                } else {
                    ReactGA.event(action);
                }
            } catch (e) {}
        }
    }
};

utils.getRemainday = (date) => {
    let days = moment.duration(moment(date).diff(moment())).asDays();
    days = Math.ceil(days);

    if (isNaN(days)) {
        return 0;
    }

    return days;
};

utils.downloadStaticFile = async (envKey, targetId) => {
    const url = `${process.env.STATIC_URL ?? "https://lgcc.lgbusinesscloud.com"}/download/${envKey}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", envKey);
    // link.setAttribute("target", "_blank");
    if (targetId) {
        document.getElementById(targetId).appendChild(link);
    } else {
        document.body.appendChild(link);
    }
    link.click();
    link.parentNode.removeChild(link);
    // window.URL.revokeObjectURL(url);
};

utils.getDefaultWorkspaceInfo = (businessId, propertyId, businessList) => {
    let businessInfo = businessId ? businessList?.filter((f) => f?.business_id === businessId)?.[0] : null;
    if (!businessInfo) {
        businessInfo = businessList?.filter(
            (f) =>
                f?.properties?.filter(
                    (ff) => ff?.property_info?.licenses?.filter((fff) => fff?.product_code === "lgcc" && (!fff?.end_date || fff?.end_date > moment().format("YYYY-MM-DD")))?.length > 0
                )?.length > 0
        )?.[0];
    }
    let propertyInfo = propertyId ? businessInfo?.properties?.filter((f) => f?.property_id === propertyId)?.[0] : null;
    if (!propertyInfo) {
        propertyInfo = businessInfo?.properties?.filter(
            (ff) => ff?.property_info?.licenses?.filter((fff) => fff?.product_code === "lgcc" && (!fff?.end_date || fff?.end_date > moment().format("YYYY-MM-DD")))?.length > 0
        )?.[0];
    }
    return { businessInfo, propertyInfo };
};

//날짜 유효성 체크 (윤달 포함)
utils.isValidDate = (vDate, minDate) => {
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

utils.socketResponseDeviceControl = async (
    deviceIds,
    params,
    forceParam,
    maxWaitTime,
    noFalilAlert,
    noResult,
    successCallBack,
    failCallBack,
    deviceControlRef,
    saveDeviceControl,
    saveInnerLoading,
    t
) => {
    const controlResultParams = {
        messageId: null,
        maxWaitTime: maxWaitTime || 60000,
        noFalilAlert: noFalilAlert || false,
        noResult: noResult || false,
        successCallBack: successCallBack || null,
        failCallBack: failCallBack || null,
    };
    let requestMessageId = await _API.onDeviceControl3([...deviceIds], params, saveInnerLoading, t, forceParam, controlResultParams.noFalilAlert, null, controlResultParams.noResult);
    if (requestMessageId) {
        controlResultParams.messageId = requestMessageId;
        if (!controlResultParams.noResult) {
            saveDeviceControl(controlResultParams);
            setTimeout(() => {
                console.log("device control timeout fail", controlResultParams.messageId, deviceControlRef.current?.messageId);
                if (deviceControlRef.current && controlResultParams.messageId === deviceControlRef.current?.messageId) {
                    saveDeviceControl(null);
                    saveInnerLoading(false);
                    if (!controlResultParams.noFalilAlert) {
                        Dialog({
                            title: t("popup.title.inform"),
                            text: t("common.msg.apply.fail"),
                            button: t("common.ok"),
                        }).then((id) => {});
                    }
                    controlResultParams.failCallBack && controlResultParams.failCallBack();
                } else {
                    saveInnerLoading(false);
                }
            }, controlResultParams.maxWaitTime);
        } else {
            saveInnerLoading(false);
        }
    } else {
        saveDeviceControl(null);
        controlResultParams.failCallBack && controlResultParams.failCallBack();
    }
};

utils.getIssueDescription = (item) => {
    let result = item?.description || "";
    try {
        const issueInfo = _CodeInfo.issueCodeTypeList?.filter((f) => f?.issue_code === item?.issue_code)?.[0] || null;
        if (issueInfo && item?.diagnostics_data) {
            const d = JSON.parse(item?.diagnostics_data);
            console.log("de", issueInfo, d);
            const addValues = [];
            if (issueInfo?.add) {
                addValues.push(issueInfo?.add);
                addValues.push(" / ");
            }
            if (issueInfo?.value) {
                addValues.push("Value: ");
                if (Array.isArray(d?.data)) {
                    addValues.push(d?.data?.[0]?.[issueInfo?.value] || d?.data?.[0]?.[issueInfo?.value] === 0 ? d?.data?.[0]?.[issueInfo?.value] : "");
                } else {
                    addValues.push(
                        d?.data?.[issueInfo?.value] || d?.data?.[issueInfo?.value] === 0
                            ? Array.isArray(d?.data?.[issueInfo?.value])
                                ? d?.data?.[issueInfo?.value]?.[0]
                                : typeof d?.data?.[issueInfo?.value] === "object"
                                ? JSON.stringify(d?.data?.[issueInfo?.value])
                                : d?.data?.[issueInfo?.value]
                            : ""
                    );
                }

                if (issueInfo?.valueTail) addValues.push(issueInfo?.valueTail);
                addValues.push(" / ");
            }
            if (["CVO-01", "CVO-99", "CUL-01", "CUL-99"].includes(item?.issue_code)) {
                addValues.push("Setting Value: Immediately");
            } else {
                if (issueInfo?.settingValue) {
                    addValues.push("Setting Value: ");
                    let thresholdVal = "";
                    if (Array.isArray(d?.data)) {
                        if (d?.data?.[0]?.threshold_value || d?.data?.[0]?.threshold_value === 0) {
                            thresholdVal = d?.data?.[0]?.threshold_value === "immediately" ? "Immediately" : d?.data?.[0]?.threshold_value;
                        } else if (d?.data?.[0]?.threshold || d?.data?.[0]?.threshold === 0) {
                            thresholdVal = d?.data?.[0]?.threshold === "immediately" ? "Immediately" : d?.data?.[0]?.threshold;
                        }
                    } else {
                        if (d?.data?.threshold_value || d?.data?.threshold_value === 0) {
                            thresholdVal = d?.data?.threshold_value === "immediately" ? "Immediately" : d?.data?.threshold_value;
                        } else if (d?.data?.threshold || d?.data?.threshold === 0) {
                            if (typeof d?.data?.threshold === "object") {
                                Object.entries(d?.data?.threshold).forEach(([key, value], i) => (thresholdVal += (i > 0 ? ", " : "") + key + ":" + value));
                            } else {
                                thresholdVal = d?.data?.threshold === "immediately" ? "Immediately" : d?.data?.threshold;
                            }
                        }
                    }
                    if (thresholdVal || thresholdVal === 0) {
                        addValues.push(thresholdVal);
                        if (thresholdVal !== "Immediately" && issueInfo?.thresholdTail) addValues.push(issueInfo?.thresholdTail);
                    }
                }
            }
            if (addValues?.length > 0) {
                addValues.unshift(" (");
                addValues.push(")");
            }
            if (issueInfo?.target && d?.data && Array.isArray(d?.data)) {
                addValues.push("\ntarget: ");
                if (item?.issue_code?.startsWith("FAN")) {
                    addValues.push(d?.data?.map((m) => m?.value?.[issueInfo?.target])?.join(", "));
                } else {
                    addValues.push(d?.data?.map((m) => m?.[issueInfo?.target])?.join(", "));
                }
            } else if (issueInfo?.target && d?.data && Array.isArray(d?.data?.value)) {
                addValues.push("\ntarget: ");
                addValues.push(d?.data?.value?.map((m) => m?.[issueInfo?.target])?.join(", "));
            } else if (issueInfo?.target && d?.data && typeof d?.data?.value === "object" && issueInfo?.issue_code?.indexOf("CLD") > -1) {
                addValues.push("\ntarget: ");
                Object.entries(d?.data?.value).forEach(([key, valueList], i) => {
                    valueList?.map((m, index) => {
                        addValues.push(`${i + index > 0 ? ", " : ""}${m?.id} (r:${m?.r || 0}, g: ${m?.g || 0}, b:${m?.b || 0})`);
                    });
                });
            }

            if (issueInfo?.groupName && d?.data && Array.isArray(d?.data)) {
                addValues.push("\nGroup Name: ");
                addValues.push(d?.data?.map((m) => m?.[issueInfo?.groupName])?.join(", "));
            }

            if (addValues?.length > 0) {
                result = result + addValues?.join("");
            }
        }
    } catch (e) {
        console.log("eeee", e);
    }
    return result;
};

// 음수, 양수, 소수점 만 입력가능
utils.replaceFloat = (val) => {
    if (val) {
        return val.replace(/(?!^)-|[^0-9.-]|(?<=\..*)\./g, "");
    }
    return "";
};

export default utils;
