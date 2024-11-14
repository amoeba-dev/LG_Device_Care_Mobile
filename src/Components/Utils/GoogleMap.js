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
    const { addressInfo, onChange, onClose } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { saveInnerLoading } = useContext(AppContext);
    const mapRef = useRef(null);
    const [center, setCenter] = useState(null);
    const [addr, setAddr] = useState(props.addr || null);
    const [select, setSelect] = useState(null);

    const getCenter = () => {
        if (addressInfo?.latitude && addressInfo?.longitude) {
            setCenter({
                lat: parseFloat(addressInfo?.latitude),
                lng: parseFloat(addressInfo?.longitude),
            });
            setSelect({
                lat: parseFloat(addressInfo?.latitude),
                lng: parseFloat(addressInfo?.longitude),
            });
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCenter({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setSelect({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (e) => {
                        console.log(e);
                        setCenter({
                            lat: 37.5664056,
                            lng: 126.9778222,
                        });
                        setSelect({
                            lat: 37.5664056,
                            lng: 126.9778222,
                        });
                    }
                );
            } else {
                setCenter({
                    lat: 37.5664056,
                    lng: 126.9778222,
                });
                setSelect({
                    lat: 37.5664056,
                    lng: 126.9778222,
                });
            }
        }
    };

    const loadMap = async () => {
        if (!center) return "";
        try {
            const { Map } = await google.maps.importLibrary("maps");
            const map = new Map(mapRef.current, {
                center,
                zoom: 17,
                disableDefaultUI: true,
                mapId: "googleMapLayer",
                zoomControl: true,
            });

            let marker = new google.maps.Marker({
                icon: { url: "/assets/images/ic_location_fill.svg" },
                map,
                position: addressInfo?.latitude && addressInfo?.longitude ? { lat: parseFloat(addressInfo?.latitude), lng: parseFloat(addressInfo?.longitude) } : center,
            });

            google.maps.event.addListener(map, "click", function (e) {
                console.log("check", e);
                const latlng = e.latLng;
                marker.setPosition(latlng);

                setSelect({
                    lat: latlng.lat(),
                    lng: latlng.lng(),
                });
            });
        } catch (e) {}
    };

    const getAddress = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${select?.lat},${select?.lng}&key=${process.env.GOOGLE_MAP_KEY}`;
        try {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setAddr(data?.results?.[0]?.formatted_address || "");
                });
        } catch (e) {}
    };

    const onApply = () => {
        if (!select?.lat || !select?.lng) {
            Dialog({
                title: t("popup.title.inform"),
                text: "지정된 위치가 없습니다.\n지도를 클릭하여 위치정보를 설정해 주세요.",
                button: "확인",
            }).then((id) => {
                if (id) {
                }
            });
            return;
        }
        onChange({ latitude: select?.lat, longitude: select?.lng, address_1: addr });
    };

    useEffect(() => {
        getCenter();
    }, []);

    useEffect(() => {
        loadMap();
    }, [center]);

    useEffect(() => {
        if (select) {
            getAddress();
        }
    }, [select]);

    return (
        <Fragment>
            <div id="popup-QR-camera" className="popup-wrapper show">
                <div className="popup popup-alert-message" role="dialog" aria-labelledby="popup-label" aria-modal="true">
                    <div className="popup-container">
                        <div className="popup-header">
                            <h1 id="popup-label">{"지도를 움직여 주소를 검색해 주세요."}</h1>
                        </div>

                        <div className="popup-content">
                            <div className="map-area">
                                <div id="googleMapLayer" ref={mapRef} style={{ height: "40rem" }}></div>
                            </div>
                            <div class="map-info">
                                <div className="location-wrap">
                                    <p>
                                        Location:
                                        <span className="latitude">{select?.lat}</span>,<span className="longitude">{select?.lng}</span>
                                    </p>
                                </div>
                                <div className="address-wrap">
                                    <p>
                                        Address: <span className="address">{addr}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="popup-footer">
                            <div className="button-box">
                                <button
                                    type="button"
                                    id="btn-record"
                                    className="btn btn-tertiary"
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    취소
                                </button>
                                <button type="button" id="btn-skip" className="btn btn-tertiary" onClick={onApply}>
                                    적용
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
