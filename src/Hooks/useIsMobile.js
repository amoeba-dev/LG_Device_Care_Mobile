import React, { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // 모바일 화면 너비 설정

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 768); // 화면 크기가 모바일인지 확인하여 설정
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange); // 윈도우 크기 변경 감지
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
