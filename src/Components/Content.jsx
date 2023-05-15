import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Content() {
    const [product,setProduct]=useState([])
    const [change,setChange]=useState(1)
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [editId, setEditId] = useState(null);
    const fetching=async ()=>{
      axios.get('http://localhost:4000/products')
      .then((data) => {
      setProduct(data.data)
      console.log(product)
      })
      .catch(error => console.log(error));
    }
  const Add=()=>{
  if (editId === null){
  const additionalData={
    name:name,
    price: price
  }
  console.log(additionalData)
  axios.post('http://localhost:4000/products',additionalData)
  .then((res)=>console.log("user added"))
.catch((err)=>console.log(err))
}
else{
  updateHandler();
}
setChange(change+1)
setName('')
setPrice('')
}
  
const DeleteHandler=(element)=>{
axios.delete(`http://localhost:4000/products/${element.id}`)
.then((res) => {
console.log("product deleted");
setChange(change + 1);
})
.catch((err) => console.log(err));
}
  
const editHandler = (id) => {
    setEditId(id);
    const productToEdit = product.find((p) => p.id === id);
    setName(productToEdit.name);
    setPrice(productToEdit.price);
  };


  const updateHandler = () => {
    const updatedProduct = {
      name: name,
      price: price,
    };
    axios
      .put(`http://localhost:4000/products/${editId}`, updatedProduct)
      .then((res) => {
        console.log("product updated");
        setChange(change + 1);
        setEditId(null);
        setName('')
        setPrice('')
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(()=>{
  fetching()
    },[change])
  

return (
    <div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Item Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  {product.map((element) => {
        return (
          <tr key={element.id}>
            <td>{editId === element.id ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="editname"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  aria-label="editname"
                />
              ) : (
                element.name
              )}</td>
             <td>{editId === element.id ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder="editprice"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                  aria-label="editprice"
                />
              ) : (
                element.price
              )}</td>
            <td>
                {editId === element.id ? (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => {
                      editHandler(element.id);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    DeleteHandler(element);
                  }}
                >
                  Delete
                </button>
              </td>
          </tr>       
        );
      })}
  </tbody>
</table>
<input type="text" className="form-control mt-2" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}} aria-label="name"/>
<input type="text" className="form-control mt-2" placeholder="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} aria-label="price"/>
<button className='App' onClick={()=>{Add()}}>ADD PRODUCTS</button>
    </div>
)
}
