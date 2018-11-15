export const randomKey = () => (
  Math.floor((Math.random() * 100) + 1)
);

export const getQueryParam = (param) => {
  const urlParams = new URL(window.location.href).searchParams;
  return urlParams.get(param);
};
