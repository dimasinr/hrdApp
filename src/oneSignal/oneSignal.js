import OneSignalReact from "react-onesignal";

export default async function runOneSignal() {

window.OneSignalReact = window.OneSignalReact || [];
  OneSignalReact.push(function() {
    OneSignalReact.init({
      appId: "9343c96f-aa0a-4af0-9f87-93d2c02b9ce0",
      safari_web_id: "web.onesignal.auto.6187ce57-f346-4a86-93e4-7d70d494c000",
      notifyButton: {
        enable: true,
      },
    });
  });
    // await OneSignalReact.init({ appId: '9343c96f-aa0a-4af0-9f87-93d2c02b9ce0',
    //  allowLocalhostAsSecureOrigin: true,
    //  safari_web_id: "web.onesignal.auto.6187ce57-f346-4a86-93e4-7d70d494c000",
    //   notifyButton: {
    //     enable: true,
    //   },
    // });
    // OneSignalReact.showSlidedownPrompt();
  }
  