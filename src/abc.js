export function logger(content = "Hello world!") {
  console.log(content);
  const thao = 26;
  const khang = 4;
  const canh = 11;
  return {
    canh,
    khang,
    thao,
  };
}

export const a = 12;

export { logger, a };
