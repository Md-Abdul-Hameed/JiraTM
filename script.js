'use strict';
const filterOptions = document.querySelectorAll(".filter-colors__container");
const mainContainer = document.querySelector(".main-container");
const modalFilters = document.querySelectorAll(".modal-filters");
const modalContainer = document.querySelector(".modal-container");
const addBtn = document.querySelector(".add");
const descBox = document.querySelector(".desc-box");
const crossBtn = document.querySelector(".remove");

let tcolor;
let colors=["lightpink","lightblue","lightgreen","black"];
let cColor = colors[colors.length-1];
let flag = false;
let taskArr = [];

let id = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$~";

if(localStorage.getItem("allTasks")){
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    for(let i = 0; i < allTasks.length; i++){
        let {color,id,task} = allTasks[i];
        taskArr.push(allTasks[i]);
        createTicket(task,color,id);
    }
}

for(let i = 0; i < filterOptions.length; i++){
    filterOptions[i].addEventListener("click",function(){
        let arr = filterOptions[i].children;
        let classArr = arr[0].classList;
        let filtercolor = classArr[0];

        let ticketColor = document.querySelectorAll(".ticket-color");
        let ticketcontainer = document.querySelectorAll(".ticket-container");
        
        for(let i = 0; i < ticketColor.length; i++){
            if(ticketColor[i].classList[1]!=filtercolor){
                ticketcontainer[i].style.display="none";
            }
            else{
                ticketcontainer[i].style.display="block";
            }
        }
            
    })
}

const filter = document.querySelector(".filter-container");
filter.addEventListener("dblclick",function(){
    let ticketcontainer = document.querySelectorAll(".ticket-container");
    for(let i = 0 ; i < ticketcontainer.length; i++){
        ticketcontainer[i].style.display = "block";
    }
})



addBtn.addEventListener("click",function(){
    if(flag==false){
        modalContainer.style.display = "flex";
    }else{
        modalContainer.style.display = "none";
    }
    flag = !flag;
})

for(let i = 0; i < modalFilters.length; i++){
    modalFilters[i].addEventListener("click",function(){
        modalFilters.forEach(function(modalFilter){
            modalFilter.classList.remove("border");
        })       
        modalFilters[i].classList.add("border");
        cColor = modalFilters[i].classList[1];
        
    })
}

descBox.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        let task = descBox.value;
        //create ticket
        
        createTicket(task,cColor);
        cColor = colors[colors.length-1];
        modalContainer.style.display = "none";
        flag = false;
        descBox.value="";            

            // let texteditable = document.querySelectorAll(".ticket-desc");
            // texteditable[texteditable.length-1].addEventListener("click",function(){
            //     texteditable[texteditable.length-1].contentEditable  = true;
            // })
            // const delticket = document.querySelectorAll(".ticket-container");
            // delticket[delticket.length-1].addEventListener("dblclick",function(){
            //     console.log("hamed");
            //     delticket[delticket.length-1].remove();
            // })

        
        
    }
})

function createTicket(task,cColor,myId){
    let result="";
    for (let i = 0; i < 6; i++) {
        result += id.charAt(Math.floor(Math.random() * id.length));
    }
    let uid = myId || result;

    
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class","ticket-container");
    ticketContainer.innerHTML=`<div class="ticket-color ${cColor}"></div>
    <div class="ticket-subcontainer">
        <div class="ticket-id">#${uid}</div>
        <div class="ticket-desc">${task}</div>
    </div>`   
    mainContainer.appendChild(ticketContainer);
   if(!myId){
    taskArr.push({
        color:cColor,
        id : uid,
        task:task
    })
    localStorage.setItem("allTasks",JSON.stringify(taskArr));
   }
    handledeleteTicket(ticketContainer);
    handleColorChange(ticketContainer);
}

let flagremove = false;

crossBtn.addEventListener("click",function(){
    if(flagremove == false){
        crossBtn.style.backgroundColor = "rgb(125,122,102)"
    }else{
        crossBtn.style.backgroundColor = "rgb(85,82,82)";
        
    }
    flagremove = !flagremove;
    
})
function handledeleteTicket(ticketContainer){
    ticketContainer.addEventListener("click",function(){
        if(flagremove == true){
            let element = ticketContainer.querySelector(".ticket-id");
            let tobeDeletedId = element.innerText.slice(1);
            let idx = taskArr.findIndex(function(ticket){
                return ticket.id == tobeDeletedId;
            })
            console.log(idx);
            taskArr.splice(idx,1);
            localStorage.setItem("allTasks",JSON.stringify(taskArr));
            ticketContainer.remove();
        }
    })
}
function changeColorInStore(colorStripElement, newColor){
    let ticketSubcontainer = colorStripElement.parentNode.children[1];
    let idElem = ticketSubcontainer.children[0];
    let id = idElem.innerText.substring(1);
    console.log(id);
    let idx = taskArr.findIndex(function(ticket){
        console.log(ticket.id);
        return ticket.id == id;
    })
    console.log(newColor);
    taskArr[idx].color = newColor;
    localStorage.setItem("allTasks",JSON.stringify(taskArr));
}
function handleColorChange(ticketcontainer){
    let ticketcolorstrip = ticketcontainer.querySelector(".ticket-color");
    ticketcolorstrip.addEventListener("click",function(){
        let prevcolor = ticketcolorstrip.classList[1]
        ticketcolorstrip.classList.remove(prevcolor);
        let newcolor;
        for(let i = 0; i < colors.length; i++){
            if(prevcolor == colors[i]){
                let j = (i+1)%colors.length;
                newcolor = colors[j];
                break; 
            }
        }
        ticketcolorstrip.classList.add(newcolor);
        changeColorInStore(ticketcolorstrip,newcolor);
  })
}