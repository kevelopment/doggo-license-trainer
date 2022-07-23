export type Time = {
  h: string,
  m: string,
  s: string
};

export const toTime = (timeInMillis: number): Time => {
  const secs = timeInMillis;
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return {
    h: pad(hours),
    m: pad(minutes),
    s: pad(seconds)
  };
}
const pad = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
}
