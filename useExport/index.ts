import { useState, useEffect, useCallback } from "react";
import { saveAs } from "file-saver";

interface CsvData {
  [key: string]: any;
}

const useCsvDownload = () => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const generateCsvFile = (data: CsvData[]) => {
    if (data.length === 0 || typeof data[0] !== "object" || data[0] === null) {
      return "";
    }
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header]).replace(/,/g, "\\,");
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  useEffect(() => {
    const downloadCsv = () => {
      const csvFile = generateCsvFile(csvData);
      const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(7);
      const fileName = `geothings_export_${timestamp}_${randomString}`;
      saveAs(blob, `${fileName}.csv`);
    };

    if (csvData.length > 0 && fileName) {
      downloadCsv();
    }
  }, [csvData, fileName]);

  return {
    csvData,
    setCsvData,
    downloadCsv: (fileName: string) => setFileName(fileName),
  };
};

export default useCsvDownload;
