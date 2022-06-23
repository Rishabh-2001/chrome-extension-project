let myLeads=[];
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

//TO DELETE ALL 
deleteBtn.addEventListener("dblclick",function()
{
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

//TO RENDER LEADS FROM LOCAL STORAGE
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

//TAKING INPUT DATA FROM INPUT COL TO MYLEADS ARRAY
inputBtn.addEventListener("click", function() {
    let key=inputEl.value;
    if(key!="")
    {
    myLeads.push(key);
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
    // console.log(localStorage.getItem("myLeads"))
    }

     
})
function crossBtnListener() {
  let classArr=document.querySelectorAll(".listItem")
  classArr.forEach(itt => {
    itt.addEventListener("click",(e)=>{
      let idFun=e.srcElement.getAttribute("value")
          crossClick(idFun)
    })
  }); 
}
//TO RENDER THE LEADS
function render(leads){
   let listItem=""
   for(let i=0;i<leads.length;i++)
   {
       let id_="cross-id"+i;
       let click1="crossClick('"+id_+"')";
    //    let click1=`crossClick(${id_})`;
    //    console.log(click1)
      

     listItem+=`
          <li class="inner-li">
              <a target='_blank' href='${leads[i]}'>
                 ${leads[i]}
              </a>
              <i value="${leads[i]}" class="fas fa-times-circle listItem"  id="${id_}"></i>
          </li>
       `
   }
   ulEl.innerHTML=listItem;
  crossBtnListener();
}

//SAVE BUTTON
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

let classArr=document.querySelectorAll(".listItem")
classArr.forEach(itt => {
    itt.addEventListener("click",(e)=>{
                   
                   let idFun=e.srcElement.getAttribute("value")
                
            
                //    console.log(idFun);
                  crossClick(idFun)
    })
});

//DOWN ONE IS ORIGINAL
function crossClick(targetKey){
    // const iconItem=document.getElementById(id)
   
        let spliceIdx=0;
        for(let i=0;i<myLeads.length;i++)
        {
            if(myLeads[i]===targetKey)
            {
                spliceIdx=i;
                break;
            }
        }
        myLeads.splice(spliceIdx,1);
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads) 
}
