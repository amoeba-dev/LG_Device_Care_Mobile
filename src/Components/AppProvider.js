import moment from "moment";
import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ auth: authInProps, children }) => {
    const [auth, setAuth] = useState(authInProps);
    const [lang, setLang] = useState(null);
    const [workspace, setWorkspace] = useState(null);
    const [businessList, setBusinessList] = useState();
    const [innerLoading, setInnerLoading] = useState(false);
    const [targetModel, setTargetModel] = useState({ open: false });
    const [product, setProduct] = useState(null);
    const [rolePermission, setRolePermission] = useState(null);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const [sideBarExpand, setSideBarExpand] = useState(false);
    const [hoverChild, setHoverChild] = useState(false);
    const [newNotice, setNewNotice] = useState(false);
    const [fileboxToolbar, setFileboxToolbar] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [myRole, setMyRole] = useState(null);
    const [deviceControl, setDeviceControl] = useState(null);
    const [isBusinessAdmin, setIsBusinessAdmin] = useState(false);
    const [isPropertyAdmin, setIsPropertyAdmin] = useState(false);

    const saveAuth = (auth) => {
        setAuth(auth);
    };

    const saveLang = (lang) => {
        setLang(lang);
    };

    const saveWorkspace = (data) => {
        setWorkspace(data);
    };

    const saveBusinessList = (data) => {
        setBusinessList(data);
    };

    const saveInnerLoading = (data) => {
        setInnerLoading(data);
    };

    const saveTargetModel = (data) => {
        setTargetModel(data);
    };

    const saveProduct = (data) => {
        setProduct(data);
    };

    const saveRolePermission = (data) => {
        setRolePermission(data);
    };

    const saveLastUpdateTime = (data) => {
        setLastUpdateTime(data);
    };

    const saveSideBarExpand = (data) => {
        setSideBarExpand(data);
    };

    const saveHoverChild = (data) => {
        setHoverChild(data);
    };

    const saveNewNotice = (data) => {
        setNewNotice(data);
    };

    const saveFileboxToolbar = (data) => {
        setFileboxToolbar(data);
    };

    const saveShowAlertMessage = (data) => {
        setShowAlertMessage(data);
    };

    const saveShowRoleModal = (data) => {
        setShowRoleModal(data);
    };

    const saveMyRole = (data) => {
        setMyRole(data);
    };

    const saveDeviceControl = (data) => {
        setDeviceControl(data);
    };

    const checkBusinessAdmin = () => {
        if (
            auth &&
            workspace &&
            auth?.portal_user_roles?.filter(
                (f) =>
                    "RegionAdministrator" === f?.common_role_name ||
                    "PlatformAdministrator" === f?.common_role_name ||
                    (["BusinessAdministrator"].includes(f?.common_role_name) && f?.business_id === workspace?.business_id)
            )?.length > 0
        ) {
            setIsBusinessAdmin(true);
        } else {
            setIsBusinessAdmin(false);
        }
    };

    const checkPropertyAdmin = () => {
        if (
            auth &&
            workspace &&
            auth?.portal_user_roles?.filter(
                (f) =>
                    "RegionAdministrator" === f?.common_role_name ||
                    "PlatformAdministrator" === f?.common_role_name ||
                    (["BusinessAdministrator", "PropertyAdministrator"].includes(f?.common_role_name) && f?.business_id === workspace?.business_id)
            )?.length > 0
        ) {
            setIsPropertyAdmin(true);
        } else {
            setIsPropertyAdmin(false);
        }
    };

    useEffect(() => {
        checkBusinessAdmin();
        checkPropertyAdmin();
    }, [auth, workspace]);

    return (
        <AppContext.Provider
            value={{
                auth,
                saveAuth,
                lang,
                saveLang,
                workspace,
                saveWorkspace,
                businessList,
                saveBusinessList,
                innerLoading,
                saveInnerLoading,
                targetModel,
                saveTargetModel,
                product,
                saveProduct,
                rolePermission,
                saveRolePermission,
                lastUpdateTime,
                saveLastUpdateTime,
                sideBarExpand,
                saveSideBarExpand,
                hoverChild,
                saveHoverChild,
                newNotice,
                saveNewNotice,
                fileboxToolbar,
                saveFileboxToolbar,
                showAlertMessage,
                saveShowAlertMessage,
                showRoleModal,
                saveShowRoleModal,
                myRole,
                saveMyRole,
                deviceControl,
                saveDeviceControl,
                isBusinessAdmin,
                isPropertyAdmin,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
