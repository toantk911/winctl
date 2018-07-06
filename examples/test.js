'use strict';

var winctl = require('../');

var activeWindow = winctl.GetActiveWindow();
winctl.Events.addListener("active-window", function (now, prev) {
  var desc = now.getDescription();
  now.readableName = (!desc || desc == "Application Frame Host") ? now.getTitle() : desc;
  console.log(`Changed active window to: ${now.readableName} [desc=${now.getDescription()}, title=${now.getTitle()}]`);
  activeWindow = now;
});

function getActiveDocument() {
  var window_title = activeWindow.getTitle();
  var validExtensions = ['psd', 'jpg', 'png', 'tif', 'jpeg', 'tiff'];

  var arr = window_title.split(' ');
  for (var i = 0; i < arr.length; i++) {
    var ext = arr[i].split('.').pop().toLowerCase();
    if (validExtensions.indexOf(ext) >= 0) {
      return arr[i];
    }
  }

  return null;
}

setInterval(function () {
  winctl.GetIdleTime();
}, 1000);

setTimeout(function (){
  console.log('Start check title for 30s!');
  winctl.Events.addListener("change-title", function(now, prev) {
    console.log("Changed window title to: %s [prev=%s]", now, prev);
  });
}, 10000);

setTimeout(function (){
  console.log('Stop check title!');
  winctl.Events.removeAllListeners("change-title");
}, 40000);
