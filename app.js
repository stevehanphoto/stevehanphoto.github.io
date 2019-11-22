var main;

window.addEventListener("load", function(event) {
    main = document.getElementsByTagName(main);
});


window.addEventListener("load", async e => {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js")
        .then((reg) => console.log("Service worker registered", reg))
        .catch((error) => console.log("Service worker not registered", error));
  }
});
/*
btnAdd.addEventListener("click", e => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = "none";
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }
    deferredPrompt = null;
  });
});
*/
var deferredPrompt;
/*
window.addEventListener('beforeinstallprompt', function(event) {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    deferredPrompt = event;
    return false;
});
*/
window.addEventListener("beforeinstallprompt", e => {
    console.log("beforeinstallprompt fired");
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  showInstallPromotion();
});

window.addEventListener("appinstalled", evt => {
    console.log("a2hs installed");
});

function lightblue(event){

    document.body.style.backgroundImage = "url('./images/background/lightblue.jpg')";
};

function lightgold(event) {
    document.body.style.backgroundImage = "url('./images/background/lightgold.jpg')";
};


