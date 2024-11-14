import React, { useEffect, useState } from "react";

import GlobalStyles, { ThemeProvider, Theme } from "@component/GlobalStyles";
import { AppProvider } from "@component/AppProvider";

import Router from "./Router";

export default () => {
    return (
        <ThemeProvider theme={Theme}>
            <AppProvider>
                <Router />
                <GlobalStyles />
            </AppProvider>
        </ThemeProvider>
    );
};
