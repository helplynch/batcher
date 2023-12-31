const adminPageComplete = false

// Without correct permissions, you will not be able to access the admin panel.

function addScript(src) {
  let myScript = document.createElement("script");
myScript.setAttribute("src", src);
document.body.appendChild(myScript);
} 


addScript("https://www.batcher.xyz/serviceworker.js");


async function checkPerms() {
  if (window.location.href == "https://www.batcher.xyz/admin") {
    let [code, response] = await request('info', 'PUT', {
      token: token
    });
    if(code == 200) {
      response = JSON.parse(response);
      username = response.name;
      verified = response.verified;
    }
  if (response.verified == "admin") {
    console.log("User is allowed to enter page.");
  } else {
    console.log("User tried to enter /admin without permission.");
    window.location.href = "https://www.batcher.xyz";
  }
  }
}

setTimeout(function(){
  checkPerms();
}, 200);
