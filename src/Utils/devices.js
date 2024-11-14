import React from "react";

const devices = {};

devices.getSupported = (key, row) => {
    return (row && row?.filter((f) => f[key])?.[0]?.[key]?.supported) || false;
};

devices.getHexRangeValue = (t, key, row, item, valCode, convertFunc, deviceInfo) => {
    let returnValue = "-";
    const type = row?.filter((f) => f[key])[0]?.[key]?.spec?.type;
    let selectVal = item;
    if (selectVal !== 0 && !selectVal) {
        selectVal = valCode ? row?.filter((f) => f[key])[0]?.[key]?.data[valCode] : row?.filter((f) => f[key])[0]?.[key]?.data?.value;
    }

    if (type === "hex-enum") {
        const enumList = row?.filter((f) => f[key])[0]?.[key]?.spec?.values[0];
        if (enumList?.length === 2 && enumList.indexOf("00") > -1 && enumList.indexOf("FF") > -1) {
            returnValue = selectVal;
        } else if (valCode) {
            returnValue = selectVal;
        } else if (selectVal) {
            selectVal = selectVal + "";
            if (
                ["soundMode", "input", "language", "aspectRatio", "pictureMode", "colorTempEx"].includes(key) &&
                // deviceInfo?.device_type === "IDB" &&
                deviceInfo?.os_type === "ANDROID"
                // deviceInfo?.device_sub_type === "CVTE"
            ) {
                returnValue = t("wrapper." + key + "." + selectVal?.toUpperCase() + ".odm_cvte" || "");
            } else if (["soundOut", "irLock", "keyLock"].includes(key)) {
                returnValue = t("wrapper." + key + "." + selectVal || "");
            } else {
                returnValue = t("wrapper." + key + "." + selectVal?.toUpperCase() || "");
            }
        }
    } else {
        if (["soundOut", "pmMode", "discolorCorrection", "smartBrightnessControl"].includes(key)) {
            returnValue = t("wrapper." + key + "." + selectVal || "");
        } else {
            returnValue = selectVal;
        }
    }
    if (convertFunc) {
        return convertFunc(returnValue, key, selectVal);
    }
    return returnValue === 0 || returnValue ? returnValue : "-";
};

devices.getDropDownItem = (t, changeData, key, row, convertFunc, deviceInfo) => {
    let returnList = [];
    const type = row?.filter((f) => f[key])[0]?.[key]?.spec?.type;
    const selectVal = row?.filter((f) => f[key])[0]?.[key]?.data?.value;

    if (type === "hex-range") {
        const range = row?.filter((f) => f[key])[0]?.[key]?.spec?.values[0]?.valdata?.map((m) => parseInt(m, 16));
        const min = Math.min(...range);
        const max = Math.max(...range);
        for (let i = min; i <= max; i++) {
            returnList.push(
                <li className="list" role="none presentation" key={i}>
                    <a href="#!" role="option" aria-selected={i == selectVal} onClick={(e) => changeData(key, i)}>
                        {convertFunc ? convertFunc(i) : i}
                    </a>
                </li>
            );
        }
    } else {
        returnList = row
            ?.filter((f) => f[key])[0]
            ?.[key]?.spec?.values[0]?.valdata?.map((item, index) => (
                <li className="list" role="none presentation" key={index}>
                    <a href="#!" role="option" aria-selected={item == selectVal} onClick={(e) => changeData(key, item)}>
                        {devices.getHexRangeValue(t, key, row, item, null, convertFunc, deviceInfo)}
                    </a>
                </li>
            ));
    }
    return returnList;
};

devices.getDropDownItems = (t, changeData, key, row, convertFunc, deviceInfo) => {
    let returnList = [];
    const type = row?.filter((f) => f[key])[0]?.[key]?.spec?.type;
    const selectVal = row?.filter((f) => f[key])[0]?.[key]?.data?.value;

    if (type === "hex-range") {
        const range = row?.filter((f) => f[key])[0]?.[key]?.spec?.values[0]?.valdata?.map((m) => parseInt(m, 16));
        const min = Math.min(...range);
        const max = Math.max(...range);
        for (let i = min; i <= max; i++) {
            returnList.push(
                { label: convertFunc ? convertFunc(i) : i, value: i }
                // <li className="list" role="none presentation" key={i}>
                //     <a href="#!" role="option" aria-selected={i == selectVal} onClick={(e) => changeData(key, i)}>
                //         {convertFunc ? convertFunc(i) : i}
                //     </a>
                // </li>
            );
        }
    } else if (["soundOut", "discolorCorrection"].includes(key)) {
        if (row?.filter((f) => f[key])[0]?.[key]?.spec?.length > 0) {
            returnList = row
                ?.filter((f) => f[key])[0]
                ?.[key]?.spec?.map((item, index) => ({ label: devices.getHexRangeValue(t, key, row, item?.value, null, convertFunc, deviceInfo), value: item?.value }));
        }
    } else {
        if (row?.filter((f) => f[key])[0]?.[key]?.spec?.values) {
            returnList = row
                ?.filter((f) => f[key])[0]
                ?.[key]?.spec?.values[0]?.valdata?.map((item, index) => ({ label: devices.getHexRangeValue(t, key, row, item, null, convertFunc, deviceInfo), value: item }));
            // <li className="list" role="none presentation" key={index}>
            //     <a href="#!" role="option" aria-selected={item == selectVal} onClick={(e) => changeData(key, item)}>
            //         {devices.getHexRangeValue(t, key, row, item, null, convertFunc, deviceInfo)}
            //     </a>
            // </li>
        }
    }
    return returnList;
};

devices.getPeriodList7 = (t) => {
    return [
        { label: t("schedule.calendar.today"), value: 0 },
        { label: t("device.label.yesterday"), value: -1 },
        { label: t("device.label.daysago", { "#": 2 }), value: -2 },
        { label: t("device.label.daysago", { "#": 3 }), value: -3 },
        { label: t("device.label.daysago", { "#": 4 }), value: -4 },
        { label: t("device.label.daysago", { "#": 5 }), value: -5 },
        { label: t("device.label.daysago", { "#": 6 }), value: -6 },
        { label: t("device.label.daysago", { "#": 7 }), value: -7 },
    ];
};

devices.getOsTypeName = (t, type) => {
    let typeName = "";
    if (type) {
        type = type.toLowerCase();
        switch (type) {
            case "webos":
                typeName = t("dv.device.webOS");
                break;
            case "windows":
                typeName = t("dv.device.windows");
                break;
            case "android":
                typeName = t("dv.device.android");
                break;
            case "display":
                typeName = t("player.label.display");
                break;

            default:
                break;
        }
        return typeName;
    }
};

devices.getCodeName = (t, key, osType, value) => {
    let returnValue = value;
    // 일부 없는 항목이 있어 일단 막음
    // if (value) {
    //     if (["soundMode", "input", "language", "aspectRatio", "pictureMode", "colorTempEx"].includes(key) && osType === "ANDROID") {
    //         returnValue = t("wrapper." + key + "." + value?.toUpperCase() + ".odm_cvte" || "");
    //     } else if (["soundOut", "irLock", "keyLock"].includes(key)) {
    //         returnValue = t("wrapper." + key + "." + value || "");
    //     } else {
    //         returnValue = t("wrapper." + key + "." + value?.toUpperCase() || "");
    //     }
    // }

    return returnValue;
};

export default devices;
