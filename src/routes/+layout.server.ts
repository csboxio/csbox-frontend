// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession, getClaim } }) => {
  /*const originalConsoleLog = console.log;

  console.log = (...args) => {
    const filePath = new URL(import.meta.url).pathname;
    originalConsoleLog(`${filePath}:`, ...args);
  };*/


  return {
    session: await getSession(),
    claim: await getClaim()
  }
}