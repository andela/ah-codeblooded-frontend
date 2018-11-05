export default (seconds) => {
  if (seconds < 60) {
    const s = Math.round(seconds);
    return `${s + (s === 1 ? ' Second' : ' Seconds')} read`;
  } if (seconds < 3600) {
    const minutes = Math.round(seconds / 60);
    return `${minutes + (minutes === 1 ? ' Minute' : ' Minutes')} read`;
  }
  return 'More than 1 hour';
};
