import { format } from "date-fns";

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString} data-sb-field-path="date">
      {format(new Date(dateString), "LLLL	d, yyyy")}
    </time>
  );
}
