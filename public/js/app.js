const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const para=document.querySelector('p2')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    messageOne.textContent="Loading!!"
    messageTwo.textContent=""

    fetch('http://localhost:3001/products?search='+location).then((response)=>{

    response.json().then((data)=>{

    if(data.error)
    {
    
        messageOne.textContent=data.error
    }
    else{
       
        messageTwo.textContent=data.location+". " +data.Climate
        messageOne.textContent=data.location
        messageTwo.textContent=data.Climate
}
})
})  
})


