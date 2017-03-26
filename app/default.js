const remote = require('electron').remote
const dialog = remote.dialog
const fs = require('fs')
const os = require('os')

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    if (confirm("Are you sure to remove? \n\nAll the settings and database will be lost.")) {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// Function to choose directory
function openDirectory () {
  var options = {
    'defaultPath': os.homedir(),
    'properties': ['openDirectory']
  }
  dialog.showOpenDialog(options, function (fileNames) {
    add_new(fileNames)
  });
}

function add_new(fileNames) {
  var li = document.createElement("li");
  var fullPath = fileNames[0];
  var dirName = fullPath.replace(/^.*[\\\/]/, '');
  var t = document.createTextNode(dirName);
  li.appendChild(t);
  document.getElementById("list").appendChild(li);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}