import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(sec: number) {
  if (sec < 0) return "00:00:00";
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function jsonToCsv<T extends object>(
  jsonArray: T[],
  enabledKeys: string[],
): string {
  if (!jsonArray.length) return "";

  const headers = enabledKeys;

  const csvRows: string[] = [];
  csvRows.push(headers.join(","));

  for (const obj of jsonArray) {
    const values = headers.map((header) => {
      let val = (obj as any)[header];
      if (val === null || val === undefined) val = "";

      val = val.toString().replace(/"/g, '""');
      if (val.search(/("|,|\n)/g) >= 0) {
        val = `"${val}"`;
      }
      return val;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

export function downloadCsv(
  csvString: string,
  filename: string = "data.csv",
): void {
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
