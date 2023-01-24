import OneSignalReact from "react-onesignal";

export default async function runOneSignal() {

// await OneSignalReact.init({
//   appId: "9343c96f-aa0a-4af0-9f87-93d2c02b9ce0",
//   safari_web_id: "web.onesignal.auto.6187ce57-f346-4a86-93e4-7d70d494c000",
//       notifyButton: {
//         enable: true,
//       },
//  });


// window.OneSignalReact = window.OneSignalReact || [];
//   OneSignalReact.push(function() {
//     OneSignalReact.init({
//       appId: "9343c96f-aa0a-4af0-9f87-93d2c02b9ce0",
//       safari_web_id: "web.onesignal.auto.6187ce57-f346-4a86-93e4-7d70d494c000",
//       notifyButton: {
//         enable: true,
//       },
//     });
//   });

OneSignalReact.getNotificationPermission()
OneSignalReact.registerForPushNotifications()
OneSignalReact.getSubscription()
  // var OneSignal = window.OneSignalReact || [];
// OneSignalReact.push(["init", {
//     appId           :   "9343c96f-aa0a-4af0-9f87-93d2c02b9ce0",
//     autoRegister    :   true, /* Set to true to automatically prompt visitors */
//     subdomainName   :   "https://sdm-app.netlify.app/",
//     notifyButton    :   {
//         enable: true /* Set to false to hide */
//     }
// }]);

// OneSignalReact.push(function() {
    OneSignalReact.once("init", function(event) {
        alert("testt");
    });
//  });

    // await OneSignalReact.init({ appId: '9343c96f-aa0a-4af0-9f87-93d2c02b9ce0',
    //  allowLocalhostAsSecureOrigin: true,
    //  safari_web_id: "web.onesignal.auto.6187ce57-f346-4a86-93e4-7d70d494c000",
    //   notifyButton: {
    //     enable: true,
    //   },
    // });
    // OneSignalReact.showSlidedownPrompt();
  }
  