import axios from "axios";
import { v4 as uuid } from "uuid";

import _CK from "@util/cookie";
import _U from "@util/utilities";
import Dialog from "@component/UI/Dialog";

const api = {};
api.get = (request) => {
    request.method = "GET";
    return api.send(request);
};
api.post = (request) => {
    request.method = "POST";
    return api.send(request);
};
api.put = (request) => {
    request.method = "PUT";
    return api.send(request);
};
api.patch = (request) => {
    request.method = "PATCH";
    return api.send(request);
};
api.delete = (request) => {
    request.method = "DELETE";
    return api.send(request);
};
api.patch = (request) => {
    request.method = "PATCH";
    return api.send(request);
};
api.send = (request) => {
    const { url, path, data, apiKey: apiKeyInRequest, serviceType, productCode } = request;
    let { method, propertyId, timezone_offset } = request;

    if (!method) method = "GET";
    // console.log("process.env.STAGE", process.env.STAGE);
    let apiUrl = process.env.API_URL;
    return new Promise((resolve, reject) => {
        const req = {
            method,
            url: url ? url : `${process.env.STAGE === "local" ? path : apiUrl + path}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "X-Frame-Options": "DENY",
                "x-content-type-options": "nosniff",
            },
            data: method.toUpperCase() !== "GET" ? data : null,
            params: method.toUpperCase() === "GET" ? data : null,
            withCredentials: true,
        };

        // const apiKey = _CK.get("DXPID") || apiKeyInRequest;

        axios(req)
            .then((res) => {
                if (res) {
                    if (data?.format === "excel") {
                        resolve && resolve(res);
                    } else if (res.status != 200 || res?.data?.status?.code !== "00-000") {
                        throw new Error(res.status.message);
                    }
                    resolve && resolve(res);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

api.onDeviceControl = (deviceIds, features, setLoading, callBack, t, rollBack, rollBackValue) => {
    const getMessageResult = (messageId) => {
        api.get({
            path: `/device/devices/messages/${messageId}/result`,
            data: {},
        })
            .then((res) => {
                if (res?.data?.result?.status == "pending") {
                    setTimeout(() => {
                        getMessageResult(messageId);
                    }, 1000);
                } else {
                    // 성공/실패 메세지
                    setLoading && setLoading(false);
                    if (res?.data?.result?.status === "true") {
                        callBack && callBack(res?.data?.result);
                    } else {
                        Dialog({
                            title: t("popup.title.inform"),
                            text: t("common.msg.apply.fail"),
                            button: t("common.ok"),
                        }).then((id) => {
                            if (rollBack && (rollBackValue || rollBackValue === 0)) {
                                rollBack(rollBackValue);
                            }
                        });
                    }
                }
            })
            .catch((e) => {
                console.log(`api error /device/devices/messages/${messageId}/result`, e);
                setLoading && setLoading(false);
                callBack && callBack(e);
            });
    };

    setLoading && setLoading(true);
    api.post({
        path: `/device/devices/control`,
        data: {
            device_ids: deviceIds,
            features: features,
        },
    })
        .then((res) => {
            res?.data?.result?.messageId && getMessageResult(res?.data?.result?.messageId);
        })
        .catch((e) => {
            console.log(`api error /device/devices/control `, deviceIds, features, e);
            setLoading && setLoading(false);
            callBack && callBack(e);
        });
};

api.sleep = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
};
api.onDeviceControl2 = async (deviceIds, features, setLoading, t, forceParam, noFalilAlert, maxWaitTimeProps, noResult) => {
    const getMessageResult = (messageId) => {
        return new Promise((resolve, reject) => {
            api.get({
                path: `/device/devices/messages/${messageId}/result`,
                data: {},
            })
                .then((res) => {
                    if (res?.data?.result?.status == "pending") {
                        return resolve(null);
                    } else {
                        return resolve(res?.data?.result);
                    }
                })
                .catch((e) => reject(e));
        });
    };

    setLoading && setLoading(true);
    try {
        const controlRes = await api.post(forceParam ? forceParam : { path: `/device/devices/control`, data: { device_ids: deviceIds, features: features } });
        if (controlRes?.data?.result?.messageId) {
            let result = null;
            const waitTime = 500;
            // LGCCAMOEBA-1257 : 3분 > LGCCAMOEBA-1294 : 15회>1분,
            const maxWaitTime = maxWaitTimeProps || 60000;
            let totalWaitTime = 0;
            if (!noResult) {
                do {
                    try {
                        const { messageId } = controlRes.data.result;
                        result = await getMessageResult(messageId);
                        if (!result) {
                            totalWaitTime += waitTime;
                            await api.sleep(waitTime);
                        }
                    } catch (e) {
                        setLoading && setLoading(false);
                        result = null;
                        return result;
                    }
                } while (!result && totalWaitTime < maxWaitTime);
            }
            setLoading && setLoading(false);
            if (result?.status !== "true" && !noFalilAlert) {
                _U.gaEvent("Inform_Apply_Fail");
                Dialog({
                    title: t("popup.title.inform"),
                    text: t("common.msg.apply.fail"),
                    button: t("common.ok"),
                }).then((id) => {});
            }
            return result;
        }
        return null;
    } catch (e) {
        console.log(`api error /device/devices/control `, deviceIds, features, e);
        setLoading && setLoading(false);
        Dialog({
            title: t("popup.title.inform"),
            text: t("common.msg.apply.fail"),
            button: t("common.ok"),
        }).then((id) => {});
        return null;
    }
};

api.onAccessLog = (type) => {
    api.post({
        path: `/issue/logging/access`,
        data: {
            type: type || "login",
        },
    })
        .then((res) => {})
        .catch((e) => {
            console.log(`api error /device/devices/control `, deviceIds, features, e);
        });
};

api.uploadS3File = (requet) => {
    const { url, file, type } = requet;
    return new Promise((resolve, reject) => {
        const req = {
            method: "PUT",
            url: url,
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "X-Frame-Options": "DENY",
                "x-content-type-options": "nosniff",
                "Cache-Control": "public, max-age=604800, immutable",
            },
            data: file,
            withCredentials: true,
        };
        req.headers["business-id"] = _CK.get("business-id");
        req.headers["property-id"] = _CK.get("property-id");
        if (type) {
            req.headers["Content-Type"] = type;
        }

        axios(req)
            .then((res) => {
                resolve && resolve(res);
            })
            .catch((e) => {
                console.log("fileUpload success", e);
                reject(e);
            });
    });
};

api.getMessageResult = (messageId) => {
    return new Promise((resolve, reject) => {
        api.get({
            path: `/device/devices/messages/${messageId}/result`,
            data: {},
        })
            .then((res) => {
                if (res?.data?.result?.status == "pending") {
                    return resolve(null);
                } else {
                    return resolve(res?.data?.result);
                }
            })
            .catch((e) => reject(e));
    });
};

api.checkExpireDate = (refresh, userId) => {
    return new Promise((resolve, reject) => {
        api.get({
            path: `/user/auth/check`,
            data: { refresh, userId },
        })
            .then((res) => {
                const { status, result } = res.data;
                if (status.code === "00-000") {
                    _CK.set("DXPID-EXPIRE", result.expired_at, { encode: (v) => v });
                }
                resolve(null);
            })
            .catch((e) => reject(e));
    });
};

api.onDeviceControl3 = async (deviceIds, features, setLoading, t, forceParam, noFalilAlert, maxWaitTimeProps, noResult) => {
    setLoading && setLoading(true);
    try {
        const controlRes = await api.post(forceParam ? forceParam : { path: `/device/devices/control`, data: { device_ids: deviceIds, features: features } });
        const messageId = controlRes?.data?.result?.messageId || null;
        noResult && setLoading && setLoading(false);
        return messageId;
    } catch (e) {
        console.log(`api error /device/devices/control `, deviceIds, features, e);
        setLoading && setLoading(false);
        if (!noFalilAlert) {
            Dialog({
                title: t("popup.title.inform"),
                text: t("common.msg.apply.fail"),
                button: t("common.ok"),
            }).then((id) => {});
        }
        return null;
    }
};

export default api;
