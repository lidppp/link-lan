import Express from "express"
const router = Express.Router()

router.route("/api/message")
    .get((req, res)=>{
      res.send("message get")
    })
    .post((req,res)=>{
      res.send("message post")
    })
    .delete((req, res)=>{
      res.send("message delete")
    })

router.route("/api/file")
    .get((req, res)=>{
      res.send("file get")
    })
    .post((req,res)=>{
      res.send("file post")
    })
    .delete((req, res)=>{
      res.send("file delete")
    })

export default router
