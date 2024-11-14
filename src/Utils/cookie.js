import Cookies from "universal-cookie";

const cm = new Cookies();

const getCookie = (key) => {
    return cm.get(key);
};

const setCookie = (key, value, options) => {
    cm.set(key, value, { path: "/", sameSite: "lax", ...options });
};

const setCookies = (cookies, url) => {
    const keys = Object.keys(cookies);
    for (let i in keys) {
        const k = keys[i];
        const v = cookies[k];
        cm.set(k, v, { path: "/", sameSite: "lax" });
    }
};

const getCookies = (keys) => {
    const cookies = {};
    for (let i in keys) {
        const key = keys[i];
        cookies[key] = getCookie(key);
    }
    return cookies;
};

export default {
    set: setCookie,
    get: getCookie,
    setCookies,
    getCookies,
};
