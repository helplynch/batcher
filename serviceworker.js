const serviceVer = "2"
const hashVer = "5"

//      _   _   _   _   _   _  
//     / \ / \ / \ / \ / \ / \ 
//    ( s | h | 4 | d | y | y ) was here <3
//     \_/ \_/ \_/ \_/ \_/ \_/ 

const devtokens = [
  "[DO_NOT_SHARE_THIS_TOKEN_WITH_ANYBODY]-batc602192123363359"
]


if (devtokens.includes(token)) {
  developerMode = true
} else {
  developerMode = false
}

setInterval(function() {
if (developerMode == true) {
  if (devtokens.includes(token)) {
  developerMode = true
  } else {
  developerMode = false
  }
}
}, 200);
