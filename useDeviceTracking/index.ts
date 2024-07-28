import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  browserName: string;
  osName: string;
  deviceType: string;
}

const useDeviceTracking = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    browserName: "",
    osName: "",
    deviceType: "",
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const ua = navigator.userAgent;
      const width = window.innerWidth;

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          ua
        );
      const isTablet = /Tablet|iPad/i.test(ua) || (isMobile && width >= 768);
      const isDesktop = !isMobile && !isTablet;

      let browserName = "Unknown";
      if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
      } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browserName = "Opera";
      } else if (ua.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
      } else if (ua.indexOf("Edge") > -1) {
        browserName = "Edge";
      } else if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
      } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
      }

      let osName = "Unknown";
      if (ua.indexOf("Win") > -1) osName = "Windows";
      if (ua.indexOf("Mac") > -1) osName = "MacOS";
      if (ua.indexOf("X11") > -1) osName = "UNIX";
      if (ua.indexOf("Linux") > -1) osName = "Linux";
      if (ua.indexOf("Android") > -1) osName = "Android";
      if (ua.indexOf("iOS") > -1) osName = "iOS";

      let deviceType = isDesktop ? "Desktop" : isTablet ? "Tablet" : "Mobile";

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        browserName,
        osName,
        deviceType,
      });
    };

    updateDeviceInfo();
    window.addEventListener("resize", updateDeviceInfo);

    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceTracking;
