const storage = localStorage
const version = "01"
const apiVersion = "12"
const sname = "BatcherAPI v." + apiVersion;
const token = storage.getItem("batcher-token")
var prefix = prompt("Please enter bot prefix:", ".");
var developerMode = false
var username = ""

const serverURL = 'https://batcherbackend.codingmadnessyt.repl.co/'
async function request(url, method, body) {
  let data = {
    method: method,
        headers: {
            "cache": "no-cache",
            "Content-Type": "application/json"
        }
  };
  if(body){
        if (typeof body == "object" && body instanceof FormData == false) {
            body = JSON.stringify(body);
        }
    data.body = body;
  }
    let res = await fetch(serverURL + url, data);
  return [res.status, await res.text()];
}

if (prefix.length == 1) {
  console.log("[" + sname + "] Prefix submitted.")
} else {
  alert("Error! \n\nPrefix must only contain 1 letter.");
  window.location.reload();
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const colors = {
  Black: '#000000',
  White: '#FFFFFF',
  Red: '#F91111',
  Orange: '#F97311',
  Yellow: '#F1FB20',
  Green: '#2EE21C',
  Blue: '#007FC4',
  Purple: '#D01CE2',
  Pink: '#FF5FF0',
  Gold: '#E6DB58',
  Crimson: '#AD0000',
  Cyan: '#54F1EC'
} // More colors coming soon <3

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
function sendrequest(dev, req) {
  htmlconsole.warn(`
    [` + sname + `] Sending request...
    `)
  if (dev == true) {
    if (req.startsWith(prefix + "title:")) {
      var newtitle = req
      document.title = newtitle.split(":").pop();
    }
    if (req.startsWith(prefix + "log:")) {
      console.log(
  '%c[' + sname + '] ' + req.split(":").pop(),
  'color: yellow'
);
    }
    if (req.startsWith(prefix + "alert:")) {
      setTimeout(function() {
        alert("[" + sname + "] \n" + req.split(":").pop());
      }, 100);
    }
    if (req.startsWith(prefix + "script:")) {
      addScript(req.split(":").pop());
    }
    htmlconsole.finish(`[` + sname + `] Complete.`);
    ids.input.value = "";
    return("Request Completed without any errors");
  } else if (dev == false) {
    htmlconsole.error("[" + sname + "] Error sending request, lacking permissions.")
    ids.input.value = "";
  } else {
    htmlconsole.error("[" + sname + "] Error sending request, unable to track user permissions.")
    ids.input.value = "";
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

htmlconsole.warn("[" + sname + "] Console loaded.");
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
    var generatedToken = "[DO_NOT_SHARE_THIS_TOKEN_WITH_ANYBODY_AS_THEY_CAN_STEAL_YOUR_ACCOUNT]-" + makeid(65);
    var name = prompt("Please enter a username to use for Batcher: ");
    storage.setItem("batcher-token", generatedToken);
    htmlconsole.warn("[" + sname + "] Token created for user.");
    let [code, response] = await request('info/add', 'PUT', {
    token: generatedToken,
    name: name,
    verified: "false"
  })
      window.location.reload();
  } else {
    let [code, response] = await request('info', 'PUT', {
      token: token
    });
    if(code == 200) {
      response = JSON.parse(response);
      username = response.name;
      verified = response.verified;
      }
    htmlconsole.warn("[" + sname + "] Token validated.");
    htmlconsole.warn("[" + sname + "] Logged in as " + response.name);
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
