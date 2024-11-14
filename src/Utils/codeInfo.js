import React from "react";

const codeInfo = {};

codeInfo.getPermissionList = (t) => {
    return [
        { label: t("common.code.role.permission.0"), value: 0 },
        { label: t("common.code.role.permission.1"), value: 1 },
        { label: t("common.code.role.permission.2"), value: 2 },
    ];
};

codeInfo.issueCodeTypeList = [
    { issue_code: "TEM-01", add: "Main", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-02", add: "Front", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-03", add: "BLU", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-04", add: "PSU", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-05", add: "External", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-06", add: "Top", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-07", add: "Buttom", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-08", add: "Psub", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-09", add: "Panel", value: "value", settingValue: true, target: false, thresholdTail: "˚C" },
    { issue_code: "TEM-21", add: "Cabinet", value: false, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "TEM-31", add: "LDM", value: false, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "TEM-41", add: "PSU", value: false, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "TEM-99", add: "Unknown", value: "value", settingValue: true, target: "id", thresholdTail: "˚C" },
    { issue_code: "DSK-01", add: null, value: "value", settingValue: true, target: false, thresholdTail: "MB" },
    { issue_code: "DSK-99", add: "Unknown", value: "value", settingValue: true, target: false, thresholdTail: "MB" },
    { issue_code: "FAN-01", add: "NR", value: null, settingValue: true, target: "name", thresholdTail: null },
    { issue_code: "FAN-02", add: "OL", value: null, settingValue: true, target: "name", thresholdTail: null },
    { issue_code: "FAN-03", add: "CL", value: null, settingValue: true, target: "name", thresholdTail: null },
    { issue_code: "FAN-04", add: "PSU", value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "FAN-99", add: "Unknown", value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "CON-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null },
    { issue_code: "RES-01", add: null, value: null, settingValue: true, target: null, thresholdTail: "min" },
    { issue_code: "RES-99", add: null, value: null, settingValue: true, target: null, thresholdTail: "min" },
    { issue_code: "SGN-01", add: "Display (System Controller)", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "SGN-21", add: "Cabinet", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "SGN-99", add: "Unknown", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "NSP-01", add: null, value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "NSP-99", add: "Unknown", value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "NIP-01", add: null, value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "NIP-99", add: "Unknown", value: null, settingValue: true, target: false, thresholdTail: null },
    { issue_code: "ETH-01", add: "System Controller Port", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "ETH-02", add: "Cabinet Port", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "ETH-99", add: "Unknown", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "PWR-01", add: "Cabinet", value: null, settingValue: true, target: null, thresholdTail: null },
    { issue_code: "PWR-02", add: "PSU", value: null, settingValue: true, target: null, thresholdTail: null },
    { issue_code: "PWR-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: null },
    { issue_code: "CLD-01", add: null, value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "CLD-99", add: "Unknown", value: null, settingValue: true, target: "id", thresholdTail: null },
    { issue_code: "HUM-01", add: null, value: "value", settingValue: true, target: null, thresholdTail: "%", valueTail: "%" },
    { issue_code: "HUM-99", add: "Unknown", value: "value", settingValue: true, target: null, thresholdTail: "%", valueTail: "%" },
    { issue_code: "DRO-01", add: null, value: null, settingValue: true, target: null, thresholdTail: "min", valueTail: null },
    { issue_code: "DRO-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: "min", valueTail: null },
    { issue_code: "BLU-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "BLU-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "PXL-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "PXL-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "FLT-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "FLT-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "IMP-01", add: "External Impact", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "IMP-02", add: "Angle", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "IMP-99", add: "Unknown", value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "VOL-01", add: null, value: "value", settingValue: true, target: null, thresholdTail: "%", valueTail: "%" },
    { issue_code: "AUD-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "CVO-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "CUL-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null },
    { issue_code: "VTG-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null }, // TODO: target 항목 정책 문의?
    { issue_code: "SFD-01", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null }, // TODO: target 항목 정책 문의?
    { issue_code: "SFD-02", add: null, value: null, settingValue: true, target: null, thresholdTail: null, valueTail: null }, // TODO: target 항목 정책 문의?
    {
        issue_code: "DIF-01",
        add: "Input",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-02",
        add: "Picture mode",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-03",
        add: "Aspect ratio",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-04",
        add: "DPM",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-05",
        add: "No signal power off",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-06",
        add: "No IR power off",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-07",
        add: "On schedule",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    {
        issue_code: "DIF-08",
        add: "Off schedule",
        value: null,
        settingValue: true,
        target: null,
        thresholdTail: null,
        valueTail: null,
        groupName: "group_name",
    },
    { issue_code: "CPU-01", add: null, value: "value", settingValue: true, target: false, thresholdTail: "%", valueTail: "%" },
    { issue_code: "CPU-99", add: "Unknown", value: "value", settingValue: true, target: false, thresholdTail: "%", valueTail: "%" },
    { issue_code: "MEM-01", add: null, value: "value", settingValue: true, target: false, thresholdTail: "%", valueTail: "%" },
    { issue_code: "MEM-99", add: "Unknown", value: "value", settingValue: true, target: false, thresholdTail: "%", valueTail: "%" },
];

codeInfo.deviceTypeFilter = (t) => {
    return [
        {
            label: t("device.label.devicetype"),
            code: "device_type",
            items: [
                { label: t("common.code.device.type.signage"), code: "signage", pCode: "device_type", checked: false },
                { label: t("common.code.device.type.led"), code: "led", pCode: "device_type", checked: false },
                { label: t("common.code.device.type.mp"), code: "mp", pCode: "device_type", checked: false },
                { label: t("common.code.device.type.idb"), code: "idb", pCode: "device_type", checked: false },
                { label: t("common.code.device.type.signagetv"), code: "signagetv", pCode: "device_type", checked: false },
                { label: t("common.code.device.type.display"), code: "display", pCode: "device_type", checked: false },
            ],
        },
    ];
};

codeInfo.supportLanguageList = (t) => {
    return [
        { label: t("common.support.language.01"), value: "en" },
        { label: t("common.support.language.02"), value: "es" },
        { label: t("common.support.language.03"), value: "ar" },
        { label: t("common.support.language.04"), value: "it" },
    ];
};

codeInfo.connectionStatusList = (t) => {
    return [
        { label: t("common.label.connected"), code: "connected" },
        { label: t("common.label.ConnectedNoSignal"), code: "connected_no_signal" },
        { label: t("common.label.DisconnectedScreenOff"), code: "disconnected_screen_off" },
        { label: t("common.label.disconnected"), code: "disconnected" },
    ];
};
codeInfo.connectionStatus6List = (t) => {
    return [
        { label: t("common.label.connected"), code: "connected" },
        { label: t("setup.troubleNotice.label.nosignal"), code: "connected_no_signal" },
        { label: t("player.label.energySaving.screenOff"), code: "screen_off" },
        { label: t("common.code.device.status.FastPowerMode"), code: "fast_power_mode" },
        { label: t("common.label.networkready"), code: "network_ready" },
        { label: t("common.label.disconnected"), code: "disconnected" },
    ];
};

codeInfo.broadcastTypeList = (t) => {
    return [
        { label: t("broadcast.commend.broadcast_video"), value: "video" },
        { label: t("broadcast.commend.broadcast_image"), value: "image" },
        { label: t("broadcast.commend.broadcast_audio"), value: "audio" },
        { label: t("broadcast.commend.broadcast_message"), value: "message" },
        { label: t("broadcast.commend.broadcast_live"), value: "live streaming" },
    ];
};

codeInfo.broadcastTypeOledList = (t) => {
    return [
        { label: t("broadcast.commend.broadcast_video"), value: "video" },
        { label: t("broadcast.commend.broadcast_message"), value: "message" },
    ];
};
codeInfo.broadcastTypeWebOsList = (t) => {
    return [
        { label: t("broadcast.commend.broadcast_video"), value: "video" },
        { label: t("broadcast.commend.broadcast_image"), value: "image" },
        { label: t("broadcast.commend.broadcast_message"), value: "message" },
        { label: t("broadcast.commend.broadcast_live"), value: "live streaming" },
    ];
};
codeInfo.executionList = (t) => {
    return [
        { label: t("common.label.immediately"), value: "immediately" },
        { label: t("schedule.code.specificday"), value: "specific" },
        { label: t("schedule.code.repeat"), value: "repeat" },
    ];
};
codeInfo.apmUpperList = (t) => {
    return [
        { label: t("schedule.code.am"), value: "AM" },
        { label: t("schedule.code.pm"), value: "PM" },
    ];
};
codeInfo.broadcastPlaybackList = (t) => {
    return [
        { txt: t("player.label.once"), name: "only once" },
        { txt: t("player.label.repeat"), name: "repeatedly" },
    ];
};
codeInfo.broadcastImgPlaybackList = (t) => {
    return [
        { txt: t("common.label.NotUsed"), name: "not used" },
        { txt: t("common.label.Used"), name: "used" },
    ];
};
codeInfo.broadcastMsgTypeList = (t) => {
    return [
        { txt: t("schedule.code.popup"), name: "pop-up" },
        { txt: t("schedule.code.fullscreen"), name: "full screen" },
    ];
};
codeInfo.broadcastMsgTypeOledList = (t) => {
    return [{ txt: t("schedule.code.popup"), name: "pop-up" }];
};
codeInfo.commandTypeList = (t) => {
    return [
        { label: t("schedule.commend.screen_on_off"), value: "Screen On/Off" },
        { label: t("schedule.commend.change_input"), value: "Input" },
        { label: t("schedule.commend.touch_lock_unlock"), value: "Touch Lock" },
        { label: t("common.label.IrKeyLock"), value: "IR Lock" },
        { label: t("schedule.commend.usb_lock_unlock"), value: "USB Lock" },
        { label: t("schedule.commend.screen_lock_unlock"), value: "Screen Lock" },
        { label: t("schedule.commend.set_brightness"), value: "Brightness" },
        { label: t("schedule.commend.set_volume"), value: "Volume" },
        { label: t("schedule.commend.install_package"), value: "Install Package" },
    ];
};
codeInfo.cmdExecutionList = (t) => {
    return [
        { label: t("schedule.code.specificday"), value: "specific" },
        { label: t("schedule.code.repeat"), value: "repeat" },
    ];
};
codeInfo.screenTypeList = (t) => {
    return [
        { txt: t("common.screenon"), name: "screen on" },
        { txt: t("player.label.energySaving.screenOff"), name: "screen off" },
    ];
};
codeInfo.touchLockTypeList = (t) => {
    return [
        { txt: t("schedule.commend.touch_lock_unlock"), name: "touch lock" },
        { txt: t("schedule.commend.touch_unlock"), name: "touch unlock" },
    ];
};
codeInfo.irLockTypeList = (t) => {
    return [
        { txt: t("common.label.IrKeyLock"), name: "ir lock" },
        { txt: t("common.label.IrKeyUnlock"), name: "ir unlock" },
    ];
};
codeInfo.usbLockTypeList = (t) => {
    return [
        { txt: t("schedule.commend.usb_lock_unlock"), name: "usb lock" },
        { txt: t("schedule.commend.usb_unlock"), name: "usb unlock" },
    ];
};
codeInfo.screenLockTypeList = (t) => {
    return [
        { txt: t("form.label.screenlock"), name: "screen lock" },
        { txt: t("form.label.screenunlock"), name: "screen unlock" },
    ];
};
codeInfo.lockTypeList = (t) => {
    return [
        { txt: t("dv.support.lock"), name: "lock" },
        { txt: t("dv.support.unlock"), name: "unlock" },
    ];
};
codeInfo.executionDayOfWeek = (t) => {
    return [
        { label: t("schedule.calendar.sunday"), value: "Sun" },
        { label: t("schedule.calendar.monday"), value: "Mon" },
        { label: t("schedule.calendar.tuesday"), value: "Tue" },
        { label: t("schedule.calendar.wednesday"), value: "Wed" },
        { label: t("schedule.calendar.thursday"), value: "Thu" },
        { label: t("schedule.calendar.friday"), value: "Fri" },
        { label: t("schedule.calendar.saturday"), value: "Sat" },
    ];
};
codeInfo.commandInputList = (t) => {
    return [
        { value: "00", label: "TV" },
        { value: "F9", label: "Android" },
        { value: "F1", label: "HDMI1" },
        { value: "F2", label: "HDMI2" },
        { value: "F5", label: "HDMI3" },
        { value: "F4", label: "HDMI4" },
        { value: "F0", label: "VGA" },
        { value: "FD", label: "Type C" },
        { value: "FE", label: "Type C 2" },
        { value: "FA", label: "PC" },
        { value: "FB", label: "DP" },
        { value: "20", label: "AV" },
        { value: "40", label: "COMPONENT" },
        { value: "60", label: "RGB" },
        { value: "70", label: "DVI-D (PC / Normal)" },
        { value: "80", label: "DVI-D (DTV / Video)" },
        { value: "90", label: "HDMI1 (DTV / Video)" },
        { value: "A0", label: "HDMI1 (PC / Normal)" },
        { value: "91", label: "HDMI2 (DTV / Video)" },
        { value: "A1", label: "HDMI2 (PC / Normal)" },
        { value: "92", label: "OPS/HDMI3/DVI-D (DTV / Video)" },
        { value: "A2", label: "OPS/HDMI3/DVI-D (PC / Normal)" },
        { value: "93", label: "HDMI4 (DTV / Video)" },
        { value: "A3", label: "HDMI4 (PC / Normal)" },
        { value: "95", label: "OPS/DVI-D (DTV / Video)" },
        { value: "A5", label: "OPS/DVI-D (PC / Normal)" },
        { value: "96", label: "HDMI3/DVI-D (DTV / Video)" },
        { value: "A6", label: "HDMI3/DVI-D (PC / Normal)" },
        { value: "97", label: "HDMI3/HDMI2/DVI-D (DTV / Video)" },
        { value: "A7", label: "HDMI3/HDMI2/DVI-D (PC / Normal)" },
        { value: "98", label: "OPS (DTV / Video)" },
        { value: "A8", label: "OPS (PC / Normal)" },
        { value: "99", label: "HDMI2/OPS (DTV / Video)" },
        { value: "A9", label: "HDMI2/OPS (PC / Normal)" },
        { value: "C0", label: "DISPLAYPORT (DTV / Video)" },
        { value: "D0", label: "DISPLAYPORT (PC / Normal)" },
        { value: "C1", label: "DISPLAYPORT/USB-C (DTV/ Video)" },
        { value: "D1", label: "DISPLAYPORT/USB-C (PC / Normal)" },
        { value: "C2", label: "HDMI3 (DTV / Video)" },
        { value: "D2", label: "HDMI3 (PC / Normal)" },
        { value: "C3", label: "HDBaseT (DTV / Video)" },
        { value: "D3", label: "HDBaseT (PC / Normal)" },
        { value: "C5", label: "USB-C (DTV / Video)" },
        { value: "D5", label: "USB-C (PC / Normal)" },
        { value: "E0", label: "SuperSign webOS Player" },
        { value: "E1", label: "Others" },
        { value: "E2", label: "Multi Screen" },
        { value: "E3", label: "URL 재생(SuperSign Server 기능)" },
        { value: "E4", label: "One:Quick" },
        { value: "E5", label: "One:Quick Flex" },
        { value: "E6", label: "One:Quick Works" },
        { value: "E7", label: "One:Quick Pro" },
        { value: "E8", label: "SI App" },
        { value: "F0", label: "SDI 1" },
        { value: "F1", label: "SDI 2" },
        { value: "F2", label: "SDI 3" },
        { value: "F3", label: "SDI 4" },
        { value: "F4", label: "Dual Link (SDI 1&2)" },
        { value: "F5", label: "Dual Link (SDI 3&4)" },
        { value: "F6", label: "Quad Link : Auto" },
        { value: "F7", label: "Quad Link : 2SI" },
        { value: "F8", label: "Quad Link : Square" },
        { value: "F9", label: "SDI Quad View" },
    ];
};
codeInfo.alertMessageMode = (t) => {
    return [
        { label: t("message.label.message"), value: "Message" },
        { label: t("alertmsg.template"), value: "Template" },
    ];
};
codeInfo.smartBrightnessControlList = (t) => {
    return [
        { label: t("wrapper.smartBrightnessControl.highlight"), value: "highlight" },
        { label: t("wrapper.smartBrightnessControl.basic"), value: "basic" },
        { label: t("wrapper.smartBrightnessControl.nearby"), value: "nearby" },
        { label: t("wrapper.smartBrightnessControl.manual"), value: "manual" },
    ];
};

codeInfo.discolorCorrectionList = (t) => {
    return [
        { label: t("wrapper.discolorCorrection.off"), value: "off" },
        { label: t("wrapper.discolorCorrection.1"), value: "1" },
        { label: t("wrapper.discolorCorrection.2"), value: "2" },
        { label: t("wrapper.discolorCorrection.3"), value: "3" },
        { label: t("wrapper.discolorCorrection.4"), value: "4" },
        { label: t("wrapper.discolorCorrection.5"), value: "5" },
    ];
};

codeInfo.getSecurityType = (t) => {
    return [
        { label: "Open", value: "open" },
        { label: "WEP", value: "wep" },
        { label: "WPA/WPA2 PSK", value: "psk" },
        { label: "WPA3 SAE", value: "sae" },
        { label: "802.1X EAP", value: "ieee8021x" },
    ];
};

codeInfo.getEapType = (t) => {
    return [
        { label: "PEAP", value: "peap" },
        { label: "TLS", value: "tls" },
        { label: "TTLS", value: "ttls" },
    ];
};

codeInfo.getPhase2AuthType = (t) => {
    return [
        { label: "MSCHAPV2", value: "MSCHAPV2" },
        { label: "GTC", value: "GTC" },
    ];
};
codeInfo.getBlackLevel = (t) => {
    return [
        { label: t("common.code.control.display.blackLevel.auto"), value: "auto" },
        { label: t("common.code.control.display.blackLevel.low"), value: "low" },
        { label: t("common.code.control.display.blackLevel.high"), value: "high" },
    ];
};
codeInfo.getHolidayRepeats = (t) => {
    return [
        { label: t("troubleNotice.label.none"), value: "none" },
        { label: t("repeat.monthly"), value: "monthly" },
        { label: t("common.label.Yearly"), value: "yearly" },
    ];
};
codeInfo.getFullMonthList = (t) => {
    return [
        { label: t("device.label.january"), value: 1 },
        { label: t("device.label.february"), value: 2 },
        { label: t("device.label.march"), value: 3 },
        { label: t("device.label.april"), value: 4 },
        { label: t("device.label.may"), value: 5 },
        { label: t("device.label.june"), value: 6 },
        { label: t("device.label.july"), value: 7 },
        { label: t("device.label.august"), value: 8 },
        { label: t("device.label.september"), value: 9 },
        { label: t("device.label.october"), value: 10 },
        { label: t("device.label.november"), value: 11 },
        { label: t("device.label.december"), value: 12 },
    ];
};

codeInfo.getWeekListLastTh = (t) => {
    return [
        { value: "01", label: t("device.label.first") },
        { value: "02", label: t("device.label.second") },
        { value: "03", label: t("device.label.third") },
        { value: "04", label: t("device.label.fourth") },
        { value: "05", label: t("device.label.last") },
    ];
};

codeInfo.getDayOfTheWeekList = (t) => {
    return [
        { value: "00", label: t("admin.label.sunday") },
        { value: "01", label: t("admin.label.monday") },
        { value: "02", label: t("admin.label.tuesday") },
        { value: "03", label: t("admin.label.wednesday") },
        { value: "04", label: t("admin.label.thursday") },
        { value: "05", label: t("admin.label.friday") },
        { value: "06", label: t("admin.label.saturday") },
    ];
};
codeInfo.getDirectionList = (t) => {
    return [
        { label: "N", value: "N" },
        { label: "NE", value: "NE" },
        { label: "E", value: "E" },
        { label: "SE", value: "SE" },
        { label: "S", value: "S" },
        { label: "SW", value: "SW" },
        { label: "W", value: "W" },
        { label: "NW", value: "NW" },
    ];
};
codeInfo.getPlaceList = (t) => {
    return [
        { label: "Indoor", value: "indoor" },
        { label: "Outdoor", value: "outdoor" },
        { label: "Window facing", value: "window facing" },
        { label: "Hotel", value: "hotel" },
    ];
};
codeInfo.getPlayerTypeList = (t) => {
    return [
        { label: "Webapp", value: "webapp" },
        { label: "OPS", value: "ops" },
        { label: "PC (HDMI)", value: "hdmi" },
        { label: "PC (DP)", value: "dp" },
    ];
};
codeInfo.getNetworkTypeList = (t) => {
    return [
        { label: "Wired", value: "wired" },
        { label: "Wireless", value: "wireless" },
    ];
};
codeInfo.getNetworkIpTypeList = (t) => {
    return [
        { label: "Static", value: "static" },
        { label: "DHCP", value: "DHCP" },
    ];
};
export default codeInfo;
