const API = "http://localhost:3000/tasks"
const list = document.getElementById("list")

async function load(){
  const res = await fetch(API)
  const data = await res.json()
  list.innerHTML=""
  data.forEach(t=>{
    list.innerHTML+=`
      <li>${t.title}
      <button onclick="del(${t.id})">X</button></li>
    `
  })
}

async function addTask(){
  const title = document.getElementById("taskInput").value
  await fetch(API,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({title})
  })
  document.getElementById("taskInput").value=""
  load()
}

async function del(id){
  await fetch(API+"/"+id,{method:"DELETE"})
  load()
}

load()
