/* eslint-disable import/prefer-default-export */
/* eslint-disable no-promise-executor-return */
export function sleep(ms: number = 2000) {
  process.stdin.pause();
  return new Promise((r) => setTimeout(r, ms));
}
