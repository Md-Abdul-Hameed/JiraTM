let lockBtn = document.querySelector(".lock");
let locked = true;
lockBtn.addEventListener("click",function(){
    let tickets = document.querySelectorAll(".ticket-desc");
    if(locked == true){
        lockBtn.classList.remove("fa-lock");
        lockBtn.classList.add("fa-unlock-alt");
        tickets.forEach(function(ticket){
            ticket.setAttribute("contentEditable","true");
        })
    }else{
        lockBtn.classList.remove("fa-unlock-alt");
        lockBtn.classList.add("fa-lock");
        tickets.forEach(function(ticket){
            ticket.setAttribute("contentEditable","false");
        })
    }
    locked = !locked;
})