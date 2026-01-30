import express from "express"
import fs from "fs"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const file = "./data/tasks.json"

app.get("/tasks",(req,res)=>{
  const data = JSON.parse(fs.readFileSync(file))
  res.json(data)
})

app.post("/tasks",(req,res)=>{
  const data = JSON.parse(fs.readFileSync(file))
  data.push({id:Date.now(),title:req.body.title})
  fs.writeFileSync(file, JSON.stringify(data))
  res.json({success:true})
})

app.delete("/tasks/:id",(req,res)=>{
  let data = JSON.parse(fs.readFileSync(file))
  data = data.filter(t=>t.id != req.params.id)
  fs.writeFileSync(file, JSON.stringify(data))
  res.json({success:true})
})

app.listen(3000)
