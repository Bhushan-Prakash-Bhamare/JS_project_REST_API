const DForm=document.getElementById('Data-form');
DForm.addEventListener('submit',formSubmit);

function formSubmit(e){
    e.preventDefault();
    let nameInput=document.getElementById('iName').value;
    let DescInput=document.getElementById('Desc').value;
    let priceInput=document.getElementById('price').value;
    let QuantityInput=document.getElementById('Quantity').value;
    let myobj={
        name:nameInput,
        description:DescInput,
        price:priceInput,
        quantity:QuantityInput
    }
    axios.post('https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items',myobj)
        .then(res=>showUser(res.data))
        .catch(err=>console.log(err));
}

window.addEventListener('DOMContentLoaded',(()=>{
    axios
        .get('https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items')
        .then((res)=>{
                for(var i=0;i<res.data.length;i++)
                    showUser(res.data[i]);
        })
        .catch((error)=>console.log(error));

}))
function showUser(myobj)
{
    var parentElem=document.getElementById('Dlist');
    const childElem=document.createElement('li');
    childElem.innerHTML=(`<span style='font-size:20px;word-spacing: 15px;'>${myobj.name}
     &nbsp &nbsp &nbsp ${myobj.description} &nbsp &nbsp ${myobj.price} &nbsp &nbsp ${myobj.quantity}<span></span>`)
    childElem.className="list-group-item text-center"
    const Qty1btn=document.createElement('button');
    Qty1btn.appendChild(document.createTextNode('Buy 1'));
    Qty1btn.className='btn btn-warning float-end mx-3'
    const Qty2btn=document.createElement('button');
    Qty2btn.appendChild(document.createTextNode('Buy 2'));
    Qty2btn.className='btn btn-primary float-end mx-3'
    const Qty3btn=document.createElement('button');
    Qty3btn.appendChild(document.createTextNode('Buy 3'));
    Qty3btn.className='btn btn-danger float-end mx-3'
    
    childElem.appendChild(Qty3btn);
    childElem.appendChild(Qty2btn);
    childElem.appendChild(Qty1btn);
    
    parentElem.appendChild(childElem);

    Qty1btn.addEventListener('click',function(){
        const dId=myobj._id;
        axios
            .get(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`)
            .then((res)=>{
                  const copyData=res.data
                  axios.put(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`,{
                  name:copyData.name,
                  description:copyData.description,
                  price:copyData.price,
                  quantity:copyData.quantity-1 })
            })
            .catch((err)=>console.log(err));
    });
    Qty2btn.addEventListener('click',function(){
      const dId=myobj._id;
      axios
          .get(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`)
          .then((res)=>{
                const copyData=res.data
                axios.put(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`,{
                name:copyData.name,
                description:copyData.description,
                price:copyData.price,
                quantity:copyData.quantity-2 })
          })
          .catch((err)=>console.log(err));
    })
    Qty3btn.addEventListener('click',function(){
        const dId=myobj._id;
      axios
          .get(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`)
          .then((res)=>{
                const copyData=res.data
                axios.put(`https://crudcrud.com/api/e6a8fe99446d4ec4bad902d49d5f68cb/items/${dId}`,{
                name:copyData.name,
                description:copyData.description,
                price:copyData.price,
                quantity:copyData.quantity-3 })
          })
          .catch((err)=>console.log(err));
    })
}