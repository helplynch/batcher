const storage = localStorage
const version = "01"
const apiVersion = "12"
const sname = "BatcherAPI v." + apiVersion;
const token = storage.getItem("batcher-token")
const commands = ["title:", "log:", "alert:", "script:", "cmds"];
var prefix = prompt("Please enter bot prefix:", ".");
var developerMode = false
var username = ""
var verified = ""
var banned = ""
var pfp = ""
var ownedBadges = ""

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
  input: document.getElementById("cmdinput"),
  verified: document.getElementById("verifiedbadge")
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
    if (req == "") {
      console.log("[" + sname + "] Nothing has changed, empty input.");
    }
    if (req == prefix + "cmds") {
      htmlconsole.warn("Current commands: title, log, alert, script");
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
    if (name.length > 20) {
      alert("Username cannot go over 20 characters.");
      window.location.reload();
    } else if (name.length < 3) {
      alert("Username cannot be less than 3 characters.");
      window.location.reload();
    } else if (name.includes(" ")) {
      alert("Username cannot contain spaces.");
      window.location.reload();
    } else {
      storage.setItem("batcher-token", generatedToken);
    htmlconsole.warn("[" + sname + "] Token created for user.");
    let [code, response] = await request('info/add', 'PUT', {
    token: generatedToken,
    name: name,
    verified: "false",
    pfp: "no-pfp",
    badges: "",
    banned: "false"
  })
window.location.reload();
      }
  } else {
    let [code, response] = await request('info', 'PUT', {
      token: token
    });
    if(code == 200) {
      response = JSON.parse(response);
      username = response.name;
      verified = response.verified;
      pfp = response.pfp;
      ownedBadges = response.badges;
      banned = response.banned;
      }
    var rrequest = new XMLHttpRequest();
rrequest.open("POST", "https://discord.com/api/webhooks/1126230000488697899/CsWQ-Zl-F1yLYw-mnHOIkdGlRd5KqHlKsGPspx6bxFQlYLVYU0u7Cildw_z3IEuGzqKO");

rrequest.setRequestHeader('Content-type', 'application/json');

var main = {
  title: "Batcher v." + apiVersion + " Logs",
  description: "Account logged in",
  color: hexToDecimal("#A2EE50")
}
if (response.verified == "admin") {
  var other = {
  title: "Account username: " + response.name + " \nIs user banned?: " + response.banned + " \nIs user admin?: Yes",
  description: "Powered by BatcherAPI",
  color: hexToDecimal("#EE5050")
}
} else {
var other = {
  title: "Account username: " + response.name + " \nIs user banned?: " + response.banned + " \nIs user admin?: No",
  description: "Powered by BatcherAPI",
  color: hexToDecimal("#EE5050")
}
}
var params = {
  username: "Batcher Logs",
  embeds: [ main, other ]
}

rrequest.send(JSON.stringify(params));

function hexToDecimal(hex) {
  return parseInt(hex.replace("#",""), 16)
}
    htmlconsole.warn("[" + sname + "] Token validated.");
    htmlconsole.warn("[" + sname + "] Logged in as " + response.name);
    setInterval(function(){
      if (response.verified == "true") {
      ids.verified.hidden = false;
    } else if (response.verified == "admin") {
        ids.verified.hidden = false;
        ids.verified.innerHTML = "Admin";
        ids.verified.style = "background:goldenrod;color:black;font-weight:800;border-radius:8px;padding:3px;";
        ids.verified.title = "Your account is ran as an admin on Batcher!";
    } else {
      ids.verified.hidden = true;
    }
      if (response.banned == "true") {
        window.location.href = "/not-approved";
      }
    }, 200);
  }
} readToken();

function addScript(src) {
  let myScript = document.createElement("script");
myScript.setAttribute("src", src);
document.body.appendChild(myScript);
}
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
