import * as z from "zod";
import {CalendarDate} from "@internationalized/date";

export function formatDate(dateStr?: string | undefined): string {
  if (!dateStr) {
    return "";
  }

  const formattedDate = new Intl.DateTimeFormat("fi-FI").format(
    new Date(dateStr)
  );

  return formattedDate;
}

export const dateValidator = z.preprocess((val) => {
  console.log(`val: ${JSON.stringify(val, null,2)}`)
  const f: CalendarDate = val as CalendarDate;

  const ff = new Date(String(f));

  if (isNaN(ff.getTime())) {
    return null;
  }


  return f  ? f: null;
},z.string())
