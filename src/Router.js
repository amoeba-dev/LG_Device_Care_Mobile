import React, { useEffect, useContext, useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "@lang/i18n";

import _U from "@util/utilities";
import Layout from "@layout/Main";
import _CK from "@util/cookie";
import _API from "@util/api";
import { AppContext } from "@component/AppProvider";
import Loading from "@component/UI/Loading";
import { MenuPage } from "./pages/main";
import { InstallInfoPage } from "./pages/info";
import { QrScan, ReceptionBefore } from "./pages/reception";

export default () => {
    const { auth, saveAuth, saveBusinessList, workspace, saveWorkspace, saveProduct, saveRolePermission, saveMyRole } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [oriWorkSpace, setOriWorkSpace] = useState(null);
    const { t } = useTranslation();
    const [noAccess, setNoAccess] = useState(false);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<MenuPage />} />
                    <Route path="/install" element={<InstallInfoPage />} />
                    <Route path="/reception" element={<QrScan />} />
                    <Route path="/sendBefore" element={<ReceptionBefore />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
};
