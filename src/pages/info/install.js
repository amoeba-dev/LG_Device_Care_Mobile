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

import { InputCalendar, TextInput, TextInputSingle, RadioBox, FileInputPreBtn } from "@component/UI/Form";
import Dialog from "@component/UI/Dialog";
import Loading from "@component/UI/Loading";
import Modal from "@component/UI/Modal";
import Barcodescanner from "@component/Utils/Barcodescanner";
import GoogleMap from "@component/Utils/GoogleMap";
import AlertDialog from "@component/Utils/AlertDialog";

export default () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { saveInnerLoading } = useContext(AppContext);
    const [scannerModal, setScannerModal] = useState(false);
    const [mapModal, setMapModal] = useState(false);
    const [alertDialog, setAlertDialog] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState();
    const [data, setData] = useState({
        common: {
            serial_number: null,
            reporter: null,
            email: null,
            phone: null,
            company_name: null,
        },
        installation: {
            install_date: moment().format("YYYY-MM-DD"),
            address_1: null,
            address_2: null,
            latitude: null,
            longitude: null,
            direction: "N",
            place: "indoor",
            front_picture: null,
            rear_picture: null,
        },
        player: {
            type: "webapp",
            model: null,
            cable_length: null,
        },
        network: {
            type: "wired",
            ap_model: null,
            ip: "static",
        },
    });

    const onSave = async () => {
        try {
            if (!data?.common?.company_name || !data?.common?.reporter || !data?.common?.email || !data?.common?.phone || !data?.common?.serial_number) {
                Dialog({
                    title: t("popup.title.inform"),
                    text: "Common 영역을 필수로 입력해야 합니다.",
                    button: "확인",
                }).then((id) => {
                    if (id) {
                    }
                });
                return;
            }
            saveInnerLoading(true);
            const res = await _API.post({ path: "/installation", data: data });
            if (deviceInfo) {
                navigate("/sendBefore", { state: { deviceInfo, installInfo: data } });
            } else {
                setAlertDialog({
                    open: true,
                    data: {
                        message: "설치정보 저장에 성공 했습니다.",
                        btnText1: "추가입력",
                        btnText2: "처음으로",
                        onClick1: () => {
                            setAlertDialog(false);
                        },
                        onClick2: () => {
                            navigate("/");
                            setAlertDialog(false);
                        },
                    },
                });
            }
        } catch (e) {
            setAlertDialog({
                open: true,
                data: {
                    message: "설치 정보 저장에 실패했습니다. 네트워크 상태를 확인해 주세요.",
                    btnText1: "다시시도",
                    btnText2: "처음으로",
                    onClick1: () => {
                        setAlertDialog(false);
                    },
                    onClick2: () => {
                        navigate("/");
                        setAlertDialog(false);
                    },
                },
            });
        } finally {
            saveInnerLoading(false);
        }
    };

    const goPage = (url) => {
        navigate(url);
    };

    const onSerialNumberScan = (item) => {
        if (item) {
            setData({ ...data, common: { ...data?.common, serial_number: item } });
            getInstallInfo(item);
        }
        setScannerModal(false);
    };
    const onMapChange = (item) => {
        if (item) {
            setData({ ...data, installation: { ...data?.installation, ...item } });
        }
        setMapModal(false);
    };

    const getInstallInfo = async (serial_number) => {
        try {
            alert(serial_number);
            saveInnerLoading(true);
            const installRes = await _API.get({ path: "/installation", data: { serial_number: serial_number } });
            if (installRes?.data?.message) {
                setData(installRes?.data?.message);
            }
        } catch (e) {
        } finally {
            saveInnerLoading(false);
        }
    };

    useEffect(() => {
        if (location?.state?.deviceInfo) {
            setData({ ...data, common: { ...data?.common, serial_number: location?.state?.deviceInfo?.common?.serial_number } });
            setDeviceInfo(location?.state?.deviceInfo);
        }
    }, [location?.state]);

    return (
        <Fragment>
            <div className="content-top"></div>
            <div className="content-middle">
                <div className="content-middle-box">
                    <div className="install">
                        <div className="install-wrap">
                            <div className="common input-wrap required">
                                <h2 className="input-wrap-title">Common</h2>
                                <div className="filed-wrap">
                                    <TextInput
                                        id="company_name"
                                        name="company_name"
                                        placeholder="Company Name"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"Company name을 입력해주세요."}
                                        maxLength={30}
                                        title="Company Name :"
                                        value={data?.common?.company_name || ""}
                                        onChange={(value) => {
                                            setData({ ...data, common: { ...data?.common, company_name: value } });
                                        }}
                                    />
                                    <TextInput
                                        id="reporter"
                                        name="reporter"
                                        placeholder="Reporter"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"Reporter를 입력해주세요."}
                                        maxLength={30}
                                        title="Reporter :"
                                        value={data?.common?.reporter || ""}
                                        onChange={(value) => {
                                            setData({ ...data, common: { ...data?.common, reporter: value } });
                                        }}
                                    />
                                    <TextInput
                                        id="email"
                                        name="email"
                                        placeholder="Reporter"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"Email을 입력해주세요."}
                                        maxLength={190}
                                        title="Email :"
                                        value={data?.common?.email || ""}
                                        onChange={(value) => {
                                            setData({ ...data, common: { ...data?.common, email: value } });
                                        }}
                                    />
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"Phone을 입력해주세요."}
                                        maxLength={20}
                                        title="Phone :"
                                        value={data?.common?.phone || ""}
                                        onChange={(value) => {
                                            setData({ ...data, common: { ...data?.common, phone: value } });
                                        }}
                                    />
                                    <TextInput
                                        id="serial_number"
                                        name="serial_number"
                                        placeholder="Serial Number"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"Serial Number를 입력해주세요."}
                                        maxLength={100}
                                        title="Serial Number :"
                                        value={data?.common?.serial_number || ""}
                                        onChange={(value) => {
                                            setData({ ...data, common: { ...data?.common, serial_number: value } });
                                        }}
                                        tailButtonList={[{ label: "카메라", className: "btn-camera", onClick: () => setScannerModal(true) }]}
                                    />
                                </div>
                            </div>
                            <div className="installation input-wrap">
                                <h2 className="input-wrap-title">Installation</h2>
                                <div className="filed-wrap">
                                    <div className="field field-datepicker field-flex">
                                        <label htmlFor="install_date" className="field-label">
                                            Date :
                                        </label>

                                        <div className="custom field-datepicker">
                                            <div className="field-form flex">
                                                <InputCalendar
                                                    name="install_date"
                                                    id="install_date"
                                                    placeholder="YYYY-MM-DD"
                                                    autoComplete="false"
                                                    ariaLabel={t("common.label.selectDate")}
                                                    calendarTitle="달력을 출력합니다."
                                                    value={data?.installation?.install_date || ""}
                                                    onChange={(e) => setData({ ...data, installation: { ...data?.installation, install_date: e?.install_date } })}
                                                    ir={t("table.head.date")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field field-type-input field-flex">
                                        <label htmlFor="address1" className="field-label">
                                            Address :
                                        </label>
                                        <div className="field-form">
                                            <div className="field-box address">
                                                <button type="button" className="btn" onClick={() => setMapModal(true)}>
                                                    Search
                                                </button>
                                                <TextInputSingle
                                                    id="address1"
                                                    name="address_1"
                                                    placeholder="Address1"
                                                    isRequired={false}
                                                    removeButton={true}
                                                    description={"Address를 입력해주세요."}
                                                    maxLength={190}
                                                    value={data?.installation?.address_1 || ""}
                                                    onChange={(value) => {
                                                        setData({ ...data, installation: { ...data?.installation, address_1: value } });
                                                    }}
                                                />
                                                <TextInputSingle
                                                    id="address2"
                                                    name="address_2"
                                                    placeholder="Address2"
                                                    isRequired={false}
                                                    removeButton={true}
                                                    description={"Address를 입력해주세요."}
                                                    maxLength={190}
                                                    value={data?.installation?.address_2 || ""}
                                                    onChange={(value) => {
                                                        setData({ ...data, installation: { ...data?.installation, address_2: value } });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field field-type-input field-flex">
                                        <label htmlFor="latitude" className="field-label">
                                            Location :
                                        </label>
                                        <div className="field-form">
                                            <div className="field-box">
                                                <div className="input-box">
                                                    <TextInputSingle
                                                        id="latitude"
                                                        name="latitude"
                                                        placeholder="Latitude"
                                                        isRequired={false}
                                                        removeButton={true}
                                                        description={"location을 입력해주세요."}
                                                        maxLength={190}
                                                        value={data?.installation?.latitude || ""}
                                                        onChange={(value) => {
                                                            setData({ ...data, installation: { ...data?.installation, latitude: value } });
                                                        }}
                                                        onValidationReplace={_U.replaceFloat}
                                                    />
                                                    <TextInputSingle
                                                        id="longitude"
                                                        name="longitude"
                                                        placeholder="Longitude"
                                                        isRequired={false}
                                                        removeButton={true}
                                                        description={"location을 입력해주세요."}
                                                        maxLength={190}
                                                        value={data?.installation?.longitude || ""}
                                                        onChange={(value) => {
                                                            setData({ ...data, installation: { ...data?.installation, longitude: value } });
                                                        }}
                                                        onValidationReplace={_U.replaceFloat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RadioBox
                                        title="Direction"
                                        name="direction"
                                        items={_CodeInfo.getDirectionList(t)}
                                        value={data?.installation?.direction || ""}
                                        onChange={(item) => {
                                            setData({ ...data, installation: { ...data?.installation, direction: item?.value } });
                                        }}
                                    />
                                    <RadioBox
                                        title="Place"
                                        name="place"
                                        items={_CodeInfo.getPlaceList(t)}
                                        value={data?.installation?.place || ""}
                                        onChange={(item) => {
                                            setData({ ...data, installation: { ...data?.installation, place: item?.value } });
                                        }}
                                    />
                                    <FileInputPreBtn
                                        title="Picture (front) :"
                                        id="front_picture"
                                        preBtnLabel="Upload"
                                        placeholder="file"
                                        description="picture (front)파일을 업로드해주세요."
                                        accept="image/*"
                                        acceptFileFormat={["jpeg", "jpg", "png", "bmp"]}
                                        value={data?.installation?.front_picture || ""}
                                        onChange={(value) => {
                                            setData({ ...data, installation: { ...data?.installation, front_picture: value } });
                                        }}
                                    />
                                    <FileInputPreBtn
                                        title="Picture (rear) :"
                                        id="rear_picture"
                                        preBtnLabel="Upload"
                                        placeholder="file"
                                        description="picture (rear)파일을 업로드해주세요."
                                        accept="image/*"
                                        acceptFileFormat={["jpeg", "jpg", "png", "bmp"]}
                                        value={data?.installation?.rear_picture || ""}
                                        onChange={(value) => {
                                            setData({ ...data, installation: { ...data?.installation, rear_picture: value } });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="player input-wrap">
                                <h2 className="input-wrap-title">Player</h2>
                                <div className="filed-wrap">
                                    <RadioBox
                                        title="Type"
                                        name="player_type"
                                        items={_CodeInfo.getPlayerTypeList(t)}
                                        value={data?.player?.type || ""}
                                        onChange={(item) => {
                                            setData({ ...data, player: { ...data?.player, type: item?.value } });
                                        }}
                                    />
                                    <TextInput
                                        title="Model Name :"
                                        id="modelName"
                                        name="modelName"
                                        placeholder="Model Name"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"modelName을 입력해주세요."}
                                        maxLength={100}
                                        value={data?.player?.model || ""}
                                        onChange={(value) => {
                                            setData({ ...data, player: { ...data?.player, model: value } });
                                        }}
                                    />
                                    <TextInput
                                        title="Cable length (meter) :"
                                        id="cable_length"
                                        name="cable_length"
                                        placeholder="length"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"length를 입력해주세요."}
                                        maxLength={100}
                                        value={data?.player?.cable_length || ""}
                                        onChange={(value) => {
                                            setData({ ...data, player: { ...data?.player, cable_length: value } });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="Network input-wrap">
                                <h2 className="input-wrap-title">Network</h2>
                                <div className="filed-wrap">
                                    <RadioBox
                                        title="Type"
                                        name="network_type"
                                        items={_CodeInfo.getNetworkTypeList(t)}
                                        value={data?.network?.type || ""}
                                        onChange={(item) => {
                                            setData({ ...data, network: { ...data?.network, type: item?.value } });
                                        }}
                                    />
                                    <TextInput
                                        title="AP Model Name :"
                                        id="ap_model"
                                        name="ap_model"
                                        placeholder="Model Name"
                                        isRequired={false}
                                        removeButton={true}
                                        description={"AP modelName을 입력해주세요."}
                                        maxLength={100}
                                        value={data?.network?.ap_model || ""}
                                        onChange={(value) => {
                                            setData({ ...data, network: { ...data?.network, ap_model: value } });
                                        }}
                                    />
                                    <RadioBox
                                        title="IP"
                                        name="network_ip"
                                        items={_CodeInfo.getNetworkIpTypeList(t)}
                                        value={data?.network?.ip || ""}
                                        onChange={(item) => {
                                            setData({ ...data, network: { ...data?.network, ip: item?.value } });
                                        }}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-save" onClick={() => onSave()}>
                                저장하기
                            </button>
                            &nbsp;
                            <button className="btn btn-cancel" onClick={() => goPage("/")}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {scannerModal && <Barcodescanner onClose={() => setScannerModal(false)} onChange={onSerialNumberScan} />}
            {mapModal && <GoogleMap onClose={() => setMapModal(false)} onChange={onMapChange} addressInfo={data?.installation} />}
            {alertDialog?.open && <AlertDialog data={alertDialog?.data} />}
        </Fragment>
    );
};
