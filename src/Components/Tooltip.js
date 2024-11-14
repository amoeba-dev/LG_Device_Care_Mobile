import React, { useState } from "react";

export const TooltipBottom = ({ txt, className, headColor }) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div className={`tooltip bottom type_a ${className || ""}`}>
            <div className="tooltip-body">
                {headColor && (
                    <span className="color-box" style={{ backgroundColor: headColor }}>
                        <em className="ir">{headColor}</em>
                    </span>
                )}
                {txt}
            </div>
        </div>
    );
};

export const TooltipTop = ({ txt, widthClass }) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <span className="tooltip-top-style">
            <div className={`tooltip top type_a ${widthClass || "width-13-rem"}`}>
                <div className="tooltip-body">{txt}</div>
            </div>
        </span>
    );
};
