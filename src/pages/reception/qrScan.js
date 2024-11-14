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
import AlertDialog from "@component/Utils/AlertDialog";

export default (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { saveInnerLoading } = useContext(AppContext);
    const [alertDialog, setAlertDialog] = useState(false);

    const getDeviceInfo = async (text) => {
        try {
            if (text) {
                saveInnerLoading(true);
                const deviceRes = await _API.get({ path: "/device_info", data: { qr_url: text } });
                const deviceInfo = deviceRes?.data?.message;
                if (deviceInfo) {
                    const snm = deviceInfo?.common?.serial_number;
                    if (snm) {
                        const installRes = await _API.get({ path: "/installation", data: { serial_number: snm } });
                        if (installRes?.data?.message) {
                            navigate("/sendBefore", { state: { deviceInfo, installInfo: installRes?.data?.message } });
                        } else {
                            navigate("/install", { state: { deviceInfo } });
                        }
                    }
                }
            }
        } catch (e) {
            Dialog({
                title: t("popup.title.inform"),
                text: "장비 정보 조회에 실패하였습니다.\n QR을 다시 촬영해 주세요.",
                button: "확인",
            }).then((id) => {
                if (id) {
                }
            });
            // const deviceInfo = { ...dummyData, common: { ...dummyData.common, serial_number: "SKYJ1231564" } };
            // navigate("/install", { state: { deviceInfo } });
        } finally {
            saveInnerLoading(false);
        }
    };

    return (
        <Fragment>
            <div id="popup-QR-camera" className="popup-wrapper show">
                <div className="popup popup-alert-message" role="dialog" aria-labelledby="popup-label" aria-modal="true">
                    <div className="popup-container">
                        <div className="popup-header">
                            <h1 id="popup-label">{"고장 접수를 위해 메뉴>xxx>xxx 로 진입해 나오는 QR을 촬영해 주세요"}</h1>
                        </div>

                        <div className="popup-content">
                            <div className="camera-area">
                                <BarcodeScannerComponent
                                    onUpdate={(err, result) => {
                                        if (result?.text) {
                                            getDeviceInfo(result?.text);
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {alertDialog?.open && <AlertDialog data={alertDialog?.data} />}
        </Fragment>
    );
};

const dummyData = {
    common: {
        model_name: "",
        serial_number: "",
        fw_version: "",
        micom_version: "",
        chip_type: "",
        utt: "",
    },
    app: {
        pro_idium_version: "",
    },
    network: {
        wifi_mac: "",
        wired_mac: "",
        ip_address: "",
        subnet_mask: "",
        gateway: "",
        wired_connection: "",
        wifi_connection: "",
        abnormal_siconnect: "",
        other_errors: "",
    },
    system: {
        power_on_off_history: "",
        emmc_life_time: "",
        temperature: 0,
    },
    video: {
        hdmi_mode: "",
        resolution: "",
        scan_type: "",
        hdcp_1_4_enc_en_status: "",
        screen_rotation: "",
        ultra_hd_deep_color: false,
        aspect_ratio: "",
        scan_inversion: false,
    },
    function: {
        failover: false,
        input_priority: "",
        on_off_scheduler: "",
        smart_energy_saving: false,
        time_date: "",
    },
    power: {
        no_ir_power_off: false,
        no_signal_power_off: false,
        dpm: "",
        dpm_wake_up_control: "",
        pm_mode: "",
        power_on_status: "",
        quick_start: false,
    },
    audio: {
        sound_out: "",
        audio_out: "",
    },
    protocol: {
        simplink_setup: false,
    },
};
