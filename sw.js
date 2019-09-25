importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '211236340357'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});


messaging
.requestPermission()
.then(function () {
    MsgElem.innerHTML = "Notification permission granted." 
    console.log("Notification permission granted.");

    // get the token in the form of promise
    return messaging.getToken()
})
.then(function(token) {
    TokenElem.innerHTML = "token is : " + token
})
.catch(function (err) {
    ErrElem.innerHTML =  ErrElem.innerHTML + "; " + err
    console.log("Unable to get permission to notify.", err);
});

messaging.onMessage(function(payload) {
console.log("Message received. ", payload);
NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload) 
});