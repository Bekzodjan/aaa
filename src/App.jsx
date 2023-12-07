import React, { useState } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const {handleSubmit,register,reset} = useForm()
  let x = JSON.parse(localStorage.getItem("users"))
  const [users,setUsers] = useState(x===null?[]:x)
  const [status,setStatus] = useState(false)
  const [edit,setEdit] = useState("")
  function mySubmit(data){
    if(edit===""){
      users.push(data)
      setUsers([...users])  
      toast.success('Yangi user qo\'shildi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      localStorage.setItem("users",JSON.stringify(users))
    }else{
      toast.warn('user o\'zgartirildi', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        });  
      users[edit] = data
      setUsers([...users])
      setEdit("")
      localStorage.setItem("users",JSON.stringify(users))
    }
    reset({
      name: "",
      surname: "",
      age: "",
    })
  }
  function deleteBtn(i){
    toast.error('user o\'chirildi', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      });
      users.splice(i,1)
      setUsers([...users])
      localStorage.setItem("users",JSON.stringify(users))
  }
  function editBtn(i){
    setStatus(true)
    setEdit(i)
    reset({
      ...users[i]
    }
    )
  }

  return (
    
    <div>
      <button className="text-bg-success" onClick={()=>setStatus(true)}>add user</button>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover={false}
theme="dark"
/>
      <table className='table table-bordered w-100'>
        <thead>
          <tr>
            <th>name</th>
            <th>surname</th>
            <th>age</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item,i)=><tr key={i}>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>{item.age}</td>
            <td>
              <button onClick={()=>deleteBtn(i)} className="btn btn-danger">delete</button>
              <button onClick={()=>editBtn(i)} className="btn btn-warning">edit</button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <Rodal visible={status} onClose={()=>{setStatus(!status);reset({name: "",surname: "",age: "",})
}}>
        <form onSubmit={handleSubmit(mySubmit)}>
          <input className='form-control mt-4' type="text" {...register("name")} placeholder='name' />
          <input className='form-control mt-3' type="text" {...register("surname")} placeholder='surname' />
          <input className='form-control mt-3 mb-1' type="text" {...register("age")} placeholder='age' />
          <button className='btn btn-info' onClick={()=>setStatus(!status)}>save</button>
        </form>
      </Rodal>
    </div>
  )
}

export default App