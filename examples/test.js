'use strict';

var winctl = require('../');
var path = require('path');

var activeWindow = winctl.GetActiveWindow();
winctl.Events.addListener("active-window", function (now, prev) {
  var desc = now.getDescription();
  now.readableName = (!desc || desc == "Application Frame Host") ? now.getTitle() : desc;
  console.log(`Changed active window to: ${now.readableName} [desc=${now.getDescription()}, title=${now.getTitle()}, process=${path.parse(now.getFullProcessImageName()).name}]`);
  activeWindow = now;
});

setInterval(function () {
  console.log(winctl.GetIdleTime());
  console.log(getActiveDocument());
}, 1000);

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
