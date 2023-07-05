const serviceVer = "2"
const hashVer = "5"

//      _   _   _   _   _   _  
//     / \ / \ / \ / \ / \ / \ 
//    ( s | h | 4 | d | y | y ) was here <3
//     \_/ \_/ \_/ \_/ \_/ \_/ 

const devtokens = []


developerMode = true


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
