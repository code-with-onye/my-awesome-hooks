import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { format } from "date-fns";

function useScreenshot() {
  const [targetElement, setTargetElement] = useState<any | null>(null);
  const [isScreenshot, setIsScreenshot] = useState(false);

  const takeScreenshot = () => {
    if (!targetElement) return;
    const timestamp = format(new Date(), "yyyy-MM-dd-HH-mm-ss");
    const filename = `geothings-screenshot-${timestamp}.png`;

    html2canvas(targetElement).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob as Blob, filename);
      });
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        setIsScreenshot(true);
        setTimeout(() => {
          takeScreenshot();
          setIsScreenshot(true);
        }, 300);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetElement && targetElement.current]);

  const onScrenshot = () => {
    setIsScreenshot(true);
    setTimeout(() => {
      takeScreenshot();
      setIsScreenshot(false);
    }, 300);
  };

  return { setTargetElement, isScreenshot, onScrenshot };
}

export default useScreenshot;
