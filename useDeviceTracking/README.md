# useDeviceTracking Hook

## Overview

The `useDeviceTracking` hook is a custom React hook that provides information about the user's device, including device type, browser, and operating system. It's useful for creating responsive designs or implementing device-specific features in your React applications.

## Installation

1. Create a new file in your project, e.g., `useDeviceTracking.ts` 
2. Copy the provided hook code into this file.
3. Make sure to export the hook at the end of the file:

```typescript
export default useDeviceTracking;
```

## Usage

To use the `useDeviceTracking` hook in your React components:

1. Import the hook into your component file:

```javascript
import useDeviceTracking from "@/hooks/useDeviceTracking";
```

2. Call the hook in your functional component:

```javascript
function MyComponent() {
  const deviceInfo = useDeviceTracking();

  // Use deviceInfo in your component
  return (
    <div>
      <h1>Device Information</h1>
      <p>Device Type: {deviceInfo.deviceType}</p>
      <p>Browser: {deviceInfo.browserName}</p>
      <p>OS: {deviceInfo.osName}</p>
    </div>
  );
}
```
Here's an example of how to use the useDeviceTracking hook in a real-world scenario to open an email based on the OS type:

```javascript
"use client";
import React from "react";
import EmailnotiImg from "../../../public/images/notify.png";
import { Button } from "../ui/button";
import useDeviceTracking from "@/hooks/useDeviceTracking";

export const EmailNoti = () => {
  const deviceInfo = useDeviceTracking();

  const getGmailLink = (): string => {
    if (deviceInfo.osName === "iOS") {
      return "googlegmail://";
    } else if (deviceInfo.osName === "Android") {
      return "intent://com.google.android.gm#Intent;scheme=https;package=com.google.android.gm;end";
    } else {
      return "https://mail.google.com";
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = getGmailLink();

    if (deviceInfo.osName === "iOS" || deviceInfo.osName === "Android") {
      window.location.href = link;

      setTimeout(() => {
        window.location.href = "https://mail.google.com";
      }, 2000);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-14 w-full mt-8">
      <Button className="rounded-2xl" size="lg">
        <a href={getGmailLink()} onClick={handleClick} className="gmail-button">
          Open Gmail
        </a>
      </Button>
    </div>
  );
};
```

## Hook Return Value

The `useDeviceTracking` hook returns an object with the following properties:

- `isMobile`: boolean
- `isTablet`: boolean
- `isDesktop`: boolean
- `browserName`: string
- `osName`: string
- `deviceType`: string

## Example: Conditional Rendering

You can use the hook for conditional rendering based on device type:

```javascript
function ResponsiveComponent() {
  const { isDesktop, isTablet, isMobile } = useDeviceTracking();

  if (isDesktop) {
    return <DesktopView />;
  } else if (isTablet) {
    return <TabletView />;
  } else if (isMobile) {
    return <MobileView />;
  }

  return <FallbackView />;
}
```

## Notes

- This hook uses the `window` and `navigator` objects, which are only available in browser environments. If you're using server-side rendering, ensure this hook is only called on the client-side to avoid errors.
- The hook automatically updates when the window is resized, potentially changing the device classification.

## TypeScript Support

The hook includes TypeScript definitions. If you're using TypeScript, you can import the `DeviceInfo` interface for type checking:

```typescript
import useDeviceTracking, { DeviceInfo } from "./path/to/useDeviceTracking";
```

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or find any bugs.

## License

MIT
