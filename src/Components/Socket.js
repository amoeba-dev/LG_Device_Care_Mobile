import React, { Fragment, useEffect, useState, useRef, useContext } from "react";
import Websocket from "react-websocket";

import _CK from "@util/cookie";
import _U from "@util/utilities";
import _API from "@util/api";
import { AppContext } from "@component/AppProvider";

export default (props) => {
    const { debug, onConnected, onDisconnected, onMessage } = props;
    const { auth, saveAuth, workspace } = useContext(AppContext);

    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [debugMessages, setDebugMessages] = useState([]);
    const [connectUrl, setConnectUrl] = useState(null);

    const onConnect = () => {
        setIsConnected(true);
        console.log(":: Socket Connect!");
        onConnected && onConnected();

        onSendMessage(
            JSON.stringify({
                action: "join",
                data: {
                    user_id: auth?.user_id,
                    property_id: workspace?.property_id,
                    product_code: "lgcc",
                },
            })
        );
    };

    const onDisconnect = () => {
        setIsConnected(false);
        console.log(":: Socket Disconnect!");
        onDisconnected && onDisconnected();
    };

    const onMessageReceived = (data) => {
        // console.log("onMessageReceived", data);
        onMessage && onMessage(data);
        try {
            const d = JSON.parse(data);
            console.log("get socket message", d);
            if (d?.name === "logout") {
                onLogout();
            } else {
                _U.postMessage("SOCKET-RECEIVED", d);
            }
        } catch (e) {
            console.log("socket error", e);
        }
    };

    const onSendMessage = (message) => {
        try {
            socket?.current?.sendMessage(message);
        } catch (e) {}
    };

    const onReceivedMessage = (e) => {
        _U.parseMessage(e).then((data) => {
            // console.log("onReceivedMessage", data);
            switch (data.code) {
                case "SOCKET-SEND":
                    onSendMessage(JSON.stringify(data.data));
                    break;
            }
        });
    };

    const onLogout = () => {
        saveAuth(null);
        let redirectUrl = "";
        switch (process.env.STAGE) {
            case "development":
                redirectUrl = process.env.BUSINESS_CLOUD_URL;
                break;
            case "staging":
                redirectUrl = process.env.BUSINESS_CLOUD_URL;
                break;
            case "production":
                redirectUrl = process.env.BUSINESS_CLOUD_URL;
                break;
            default:
                redirectUrl = "/";
                break;
        }
        if (window.opener) window.close();
        else location.href = redirectUrl;
    };

    useEffect(() => {
        let stage = "dev";
        switch (process.env.STAGE) {
            case "local":
            case "development":
                stage = "dev";
                break;
            case "staging":
                stage = "st";
                break;
            case "production":
                stage = "op";
                break;
        }
        const url = process.env.WS_URL?.replace("{region}", _CK.get("region") || "kic")?.replace("{stage}", stage);
        // console.log("connect url :: ", url);
        setConnectUrl(url);
        window.addEventListener("message", onReceivedMessage);
        return () => {
            window.removeEventListener("message", onReceivedMessage);
        };
    }, []);

    return connectUrl ? (
        <Fragment>
            <Websocket ref={socket} url={connectUrl} onOpen={onConnect} onClose={onDisconnect} onMessage={onMessageReceived} />
        </Fragment>
    ) : (
        ""
    );
};
