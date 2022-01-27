const createModal = document.getElementById('create-btn');


const showModal = ()=>{
    console.log("This is a modal")
    document.getElementById('my-modal').classList.toggle('modal')

};

createModal.addEventListener('click', showModal());