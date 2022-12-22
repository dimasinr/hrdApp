import OneSignalReact from "react-onesignal";

export default async function runOneSignal() {
    await OneSignalReact.init({ appId: '41c395bc-3480-4b7e-b339-75c9265db19a', allowLocalhostAsSecureOrigin: true});
    OneSignalReact.showSlidedownPrompt();
  }
  