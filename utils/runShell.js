import {exec} from "child_process"

export function shell(cmdStr){
  return new Promise((resolve, reject)=>{
    exec(cmdStr, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })

}
