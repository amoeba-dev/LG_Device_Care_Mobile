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
    const location = useLocation();
    const { saveInnerLoading } = useContext(AppContext);
    const [sendInfo, setSendInfo] = useState({
        reporter: {
            name: "",
            email: "",
            phone: "",
            company_name: "",
        },
        device_info: {
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
        },
        install_info: {
            common: {
                serial_number: "",
                reporter: "",
                email: "",
                phone: "",
                company_name: "",
            },
            installation: {
                install_date: "",
                address_1: "",
                address_2: "",
                latitude: 0,
                longitude: 0,
                direction: "",
                place: "",
                front_picture: "",
                rear_picture: "",
            },
            player: {
                type: "",
                model: "",
                cable_length: 0,
            },
            network: {
                type: "",
                ap_model: "",
                ip: "",
            },
        },
    });

    const onSend = async () => {
        try {
            saveInnerLoading(true);
            const res = await _API.post({ path: "/issue", data: sendInfo });
            Dialog({
                title: t("popup.title.inform"),
                text: "고장 접수가 완료되었습니다. 담당자가 빠르게 검토하여 회신 드리겠습니다.",
                button: "처음으로",
            }).then((id) => {
                if (id) {
                    navigate("/");
                }
            });
        } catch (e) {
            Dialog({
                title: t("popup.title.inform"),
                text: "고장 접수가 등록이 실패 하였습니다.ㅜ잠시 후 다시 접수해 주세요.",
                button: "확인",
            }).then((id) => {
                if (id) {
                }
            });
        } finally {
            saveInnerLoading(false);
        }
    };

    useEffect(() => {
        if (location?.state) {
            setSendInfo({
                ...sendInfo,
                reporter: {
                    name: location?.state?.installInfo?.common?.reporter,
                    email: location?.state?.installInfo?.common?.email,
                    phone: location?.state?.installInfo?.common?.phone,
                    company_name: location?.state?.installInfo?.common?.company_name,
                },
                device_info: { ...location?.state?.deviceInfo },
                install_info: { ...location?.state?.installInfo },
            });
        } else {
            Dialog({
                title: t("popup.title.inform"),
                text: "설치정보 및 장비 정보가 없습니다.",
                button: "확인",
            }).then((id) => {
                if (id) {
                    navigate("/");
                }
            });
        }
    }, [location?.state]);

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
                                <button type="button" id="btn-add" className="btn btn-tertiary" onClick={() => {}} disabled={true}>
                                    {"스스로 진단하기"}
                                </button>
                                <button
                                    type="button"
                                    id="btn-end"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        onSend();
                                    }}
                                >
                                    {"그냥 접수하기"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
