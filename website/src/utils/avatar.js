import multiavatar from "@multiavatar/multiavatar";

const encodeSvg = function (str) {
    return "data:image/svg+xml," + str.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/{/g,"%7B").replace(/}/g,"%7D").replace(/</g,"%3C").replace(/>/g,"%3E");
}

function outPut(svgStr){
  return {
    background: `url("${encodeSvg(svgStr)}") center center / 100% no-repeat`
  }
}

export function getAvatar(key){
  return outPut(multiavatar(key))
}

console.log(getAvatar("abc"));
