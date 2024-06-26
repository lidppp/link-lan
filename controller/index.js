import Express from "express"
import {runSql, sqlGet} from "../utils/sql.js";
import ResultMessage from "../utils/resultMessage.js";
const router = Express.Router()

router.route("/api/message")
    .get((req, res)=>{
      sqlGet(`SELECT id,msg,create_time FROM message ORDER BY create_time DESC`).then((sqlRes)=>{
        res.send(ResultMessage.success(sqlRes))
      }).catch(err=>{
        res.send(ResultMessage.error(err.message))
      })
    })
    .post((req,res)=>{
      const msg = req.body.msg;
      runSql("INSERT INTO message (msg, create_time) values (?, ?)", [msg, +new Date()]).then(sqlRes=>{
        res.send(ResultMessage.success())
      }).catch(err=>{
        res.send(ResultMessage.error(err.message))
      })
    })
    .delete((req, res)=>{
      const id = req.body.id;
      runSql("DELETE FROM message WHERE id=?", [id]).then(sqlRes=>{
        res.send(ResultMessage.success())
      }).catch(err=>{
        res.send(ResultMessage.error(err.message))
      })
    })


export default router
