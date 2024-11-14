import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";

import _API from "@util/api";
import cookie from "@util/cookie";
import Dialog from "@component/UI/Dialog";
import { useTranslation } from "react-i18next";
import { AppContext } from "@component/AppProvider";
import _U from "@util/utilities";

const useLicenseNotice = () => {
    const { t } = useTranslation();
    const { product, auth, workspace } = useContext(AppContext);
    const [isShow, setIsShow] = useState(true);

    const fetchData = async () => {
        try {
            if (product && product.type === "subscription") {
                if ((product?.licensed_device_count || 0) - (product?.device_count || 0) < 0) {
                    _U.gaEvent("Inform_LicenseSubscriptionExceeds");
                    Dialog({
                        title: t("common.label.DeviceExceeds"),
                        body: (
                            <Fragment>
                                <p className="description">{t("subtext.desc.subscription.exceed.message")}</p>
                                <div className="device-info">
                                    <dl>
                                        <dt>{t("common.label.NumberofDevicesExceeded")}</dt>
                                        <dd>
                                            {(product?.device_count || 0) - (product?.licensed_device_count || 0)} {t("device.label.devices")}
                                        </dd>
                                    </dl>
                                    {/* <dl>
                                        <dt>{t("common.label.ExceededPeriod")}</dt>
                                        <dd>xxxxxxxxx</dd>
                                    </dl> */}
                                    <dl>
                                        <dt>{t("common.label.PricingURL")}</dt>
                                        <dd>
                                            {process.env.PRICING_URL}
                                            <button type="button" className="btn btn-open" onClick={() => window.open(process.env.PRICING_URL)}>
                                                {t("common.label.open")}
                                            </button>
                                        </dd>
                                    </dl>
                                </div>
                            </Fragment>
                        ),
                        button: t("common.ok"),
                    }).then(() => {
                        _U.gaEvent("Inform_LicenseSubscriptionExceeds_OK");
                    });
                }
            } else {
                const licensePromise = _API.get({ path: "/dashboard/device/license", serviceType: product?.service_type, productCode: product?.product_code }).then((res) => {
                    if (res?.data?.result) {
                        const { is_subscribe, d_day, expire_date } = res?.data?.result;
                        if (is_subscribe) return;

                        const nDay = d_day || d_day === 0 ? Math.ceil(d_day) : null;
                        if (nDay === 0 || nDay <= 30) {
                            const info = cookie.get("license_remind");
                            if (info) return;
                            if (nDay < 0) {
                                _U.gaEvent("Inform_LicenseGracePeriod");
                            } else {
                                _U.gaEvent("Inform_LicenseNotice");
                            }
                            const dTitle =
                                nDay < 0
                                    ? t("common.license.notice.title.after", { 0: moment(_U.getOffsetTime(auth, workspace, moment())).add(nDay, "days").format("YYYY-MM-DD") })
                                    : t("common.license.notice.title", { 0: nDay });
                            const dText =
                                nDay < 0
                                    ? t("common.license.notice.text.after", { 0: moment(_U.getOffsetTime(auth, workspace, moment())).add(nDay, "days").format("YYYY-MM-DD") })
                                    : t("common.license.notice.text", {
                                          0: moment(_U.getOffsetTime(auth, workspace, moment())).add(nDay, "days").format("YYYY-MM-DD"),
                                          1: nDay,
                                      });
                            Dialog({
                                title: dTitle,
                                text: dText,
                                button: [t("common.ok"), t("button.label.remind.later")],
                            }).then((isConfirm) => {
                                if (!isConfirm) {
                                    if (nDay < 0) {
                                        _U.gaEvent("Inform_LicenseGracePeriod_RemindLater");
                                    } else {
                                        _U.gaEvent("Inform_LicenseNotice_RemindLater");
                                    }
                                    return;
                                } else {
                                    if (nDay < 0) {
                                        _U.gaEvent("Inform_LicenseGracePeriod_OK");
                                    } else {
                                        _U.gaEvent("Inform_LicenseNotice_OK");
                                    }
                                }

                                const expires = new Date();
                                expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
                                document.cookie = `license_remind=true;expires=${expires.toUTCString()};path=/`;
                            });
                        } else if (!d_day) {
                            const notiInfo = cookie.get("license_issue_notice");
                            if (notiInfo) return;
                            Dialog({
                                title: t("license.issue.notice"),
                                text: (
                                    <>
                                        {t("license.issue.notice.desc01")}
                                        <br />
                                        {t("license.issue.notice.desc02")}
                                    </>
                                ),
                                button: [t("common.ok"), t("button.label.remind.later")],
                            }).then((isConfirm) => {
                                if (!isConfirm) {
                                    _U.gaEvent("Inform_LicenseNotice_RemindLater");
                                    return;
                                }
                                _U.gaEvent("Inform_LicenseNotice_OK");
                                const expires = new Date();
                                expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
                                document.cookie = `license_issue_notice=true;expires=${expires.toUTCString()};path=/`;
                            });
                        }
                    }
                });

                await Promise.all([licensePromise]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return isShow;
};

export default useLicenseNotice;
