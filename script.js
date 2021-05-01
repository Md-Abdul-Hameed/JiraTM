const filterOptions = document.querySelectorAll(".filter-colors__container");
const mainContainer = document.querySelector(".main-container");
const modalFilters = document.querySelectorAll(".modal-filters");
const modalContainer = document.querySelector(".modal-container");
const addBtn = document.querySelector(".add");
const descBox = document.querySelector(".desc-box");

let tcolor;
let colors=["lightpink","lightblue","lightgreen","black"];
let cColor = colors[colors.length-1];
let flag = false;

let id = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$~";

for(let i = 0; i < filterOptions.length; i++){
    filterOptions[i].addEventListener("click",function(){
        let arr = filterOptions[i].children;
        let classArr = arr[0].classList;
        let filtercolor = classArr[0];

        let ticketColor = document.querySelectorAll(".ticket-color");
        let ticketcontainer = document.querySelectorAll(".ticket-container");
        
        for(let i = 0; i < ticketColor.length; i++){
            if(ticketColor[i].classList[1]!=filtercolor){
                console.log("imad");
                ticketcontainer[i].style.display="none";
            }
            else{
                ticketcontainer[i].style.display="block";
            }
        }
            
    })
}

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
        tcolor = document.querySelectorAll(".ticket-color");
        let i = tcolor.length-1;
            tcolor[i].addEventListener("click",function(){
                  let prevcolor = tcolor[i].classList[1]
                  tcolor[i].classList.remove(prevcolor);
                  let newcolor;
                  for(let i = 0; i < colors.length; i++){
                      if(prevcolor == colors[i]){
                          let j = (i+1)%colors.length;
                          newcolor = colors[j];
                          break; 
                      }
                  }
                  tcolor[i].classList.add(newcolor);
                            
            })

            let texteditable = document.querySelectorAll(".ticket-desc");
            texteditable[texteditable.length-1].addEventListener("click",function(){
                texteditable[texteditable.length-1].contentEditable  = true;
            })
        
        
    }
})

function createTicket(task,cColor){
    let result="";
    for (let i = 0; i < 6; i++) {
        result += id.charAt(Math.floor(Math.random() * id.length));
    }

    
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class","ticket-container");
    ticketContainer.innerHTML=`<div class="ticket-color ${cColor}"></div>
    <div class="ticket-subcontainer">
        <div class="ticket-id">#${result}</div>
        <div class="ticket-desc">${task}</div>
    </div>`   
    mainContainer.appendChild(ticketContainer);
}