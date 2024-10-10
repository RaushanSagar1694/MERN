import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './List.css';

const  List = ( { url} ) => {


  const [list, setList] = useState([]);

  const fetchList = async () =>{
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if(response.data.success){
        setList(response.data.data);
      }
      else{
        toast.error("Error");
      }
  }

  const removeFood = async (foodId) => {
      const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
      await fetchList();

      if(response.data.success){
          //remove data
          toast.success(response.data.message);
      }
      else((e) => {
        console.log(e)
        toast.error("Error");
      })
      
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p className='all-food-list-p'>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index)=> {
          return (
            <div  key={index} className="list-table-format item">
              <img src={`${url}/images/`+item.image} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>$ {item.price}</p>
              <p onClick={()=> {removeFood(item._id)}} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default  List
