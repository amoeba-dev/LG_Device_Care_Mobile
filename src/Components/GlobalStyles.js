import { createGlobalStyle, ThemeProvider as Provider } from "styled-components";

// import "@resources/style.css";

const theme = {
    color: {
        main: "#E52527",
    },
};

const GlobalStyles = createGlobalStyle``;
export default GlobalStyles;
export const Theme = theme;
export const ThemeProvider = Provider;
