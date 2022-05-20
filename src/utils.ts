// TODO find type of function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (func: any, delay: number) => {
  let timer: number;
  return function debounced(this: object) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    clearTimeout(timer);
    timer = window.setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
