const adminPageComplete = false

// Without correct permissions, you will not be able to access the admin panel.

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

checkPerms();
