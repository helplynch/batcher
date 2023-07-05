const storage = localStorage
const version = "01"
const apiVersion = "12"
const name = "BatcherAPI v." + apiVersion;
const token = storage.getItem("batcher-token")
var prefix = prompt("Please enter bot prefix:", ".");
var developerMode = false

if (prefix.length == 1) {
  console.log("[" + name + "] Prefix submitted.")
} else {
  alert("Error! \n\nPrefix must only contain 1 letter.");
  window.location.reload();
}

ids = {
  console: document.getElementById("console"),
  input: document.getElementById("cmdinput")
}

htmlconsole = {
  warn: function(text) {
  const newDiv = document.createElement("div");

  const newContent = document.createTextNode(text + "\n\n");

  newDiv.style = "color:orange;font-weight:900;"
    
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("endconsole");
  document.body.insertBefore(newDiv, currentDiv);
  },
  finish: function(text) {
  const newDiv = document.createElement("div");

  const newContent = document.createTextNode(text + "\n\n");

  newDiv.style = "color:green;font-weight:900;"
    
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("endconsole");
  document.body.insertBefore(newDiv, currentDiv);
  },
  error: function(text) {
  const newDiv = document.createElement("div");

  const newContent = document.createTextNode(text + "\n\n");

  newDiv.style = "color:crimson;font-weight:900;"
    
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("endconsole");
  document.body.insertBefore(newDiv, currentDiv);
  }
}
async function sendrequest(dev, req) {
  htmlconsole.warn(`
    [` + name + `] Sending request...
    `)
  if (dev == true) {
    if (req.startsWith(prefix + "title:")) {
      var newtitle = req
      document.title = newtitle.split(":").pop();
    }
    if (req.startsWith(prefix + "log:")) {
      console.log(
  '%c[' + name + '] ' + req.split(":").pop(),
  'color: yellow'
);
    }
    if (req.startsWith(prefix + "alert:")) {
      setTimeout(function() {
        alert("[" + name + "] \n" + req.split(":").pop());
      }, 100);
    }
    htmlconsole.finish(`[` + name + `] Complete.`)
    return("Request Completed without any errors");
  } else if (dev == false) {
    htmlconsole.error("[" + name + "] Error sending request, lacking permissions.")
  } else {
    htmlconsole.error("[" + name + "] Error sending request, unable to track user permissions.")
  }
}

async function sendCommand() {
  cmd = ids.input.value;
  if (developerMode == true) {
    sendrequest(true, cmd);
  } else if (developerMode == false) {
    sendrequest(false, cmd);
  } else {
    sendrequest(null, cmd);
  }
}

htmlconsole.warn("[" + name + "] Console loaded.");
console.log(`
%c
 ######  #######    #    ######  
 #     # #         # #   #     # 
 #     # #        #   #  #     # 
 ######  #####   #     # #     # 
 #   #   #       ####### #     # 
 #    #  #       #     # #     # 
 #     # ####### #     # ######  
                                 

DO NOT SHARE YOUR USERTOKEN WITH ANYBODY NO MATTER WHAT. IT IS YOUR UNIQUE IDENTIFICATION TOKEN AND ANYONE CAN ACCESS YOUR PRECISION ACCOUNT WITH IT!
`,
'color: red')
async function readToken() {
  if (token == null) {
    storage.setItem("batcher-token", "[DO_NOT_SHARE_THIS_TOKEN_WITH_ANYBODY]-batc" + Math.floor(Math.random(1222333444555666) * 999999999999998));
    htmlconsole.warn("[" + name + "] Token created for user.");
  } else {
    htmlconsole.warn("[" + name + "] Token validated.");
  }
} readToken();

function addScript(src) {
  let myScript = document.createElement("script");
myScript.setAttribute("src", src);
document.body.appendChild(myScript);
} addScript("serviceworker.js");
console.warn(`
 #     # ####### ####### ###  #####  ####### 
 ##    # #     #    #     #  #     # #       
 # #   # #     #    #     #  #       #       
 #  #  # #     #    #     #  #       #####   
 #   # # #     #    #     #  #       #       
 #    ## #     #    #     #  #     # #       
 #     # #######    #    ###  #####  ####### 

TAKE CAUTION PASTING ANY SCRIPTS INTO THIS CONSOLE AS PEOPLE MAY ATTEMPT TO STEAL YOUR PERSONAL TOKEN WITH IT!
`);
