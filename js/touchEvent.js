let initialX, initialY, offsetX, offsetY;
let draggingItem = null;
let originalItem = null;
let touchHighlight = null;

function startTouch(event) {  
    originalItem=event.target.closest(".card");
    cloneItem = originalItem.cloneNode(true);
    document.getElementById("touch-card").replaceChildren(cloneItem);
    draggingItem=document.getElementById("touch-card");
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
    offsetX=originalItem.getBoundingClientRect().x; 
    offsetY=originalItem.getBoundingClientRect().y; 
    draggingItem.style.top=offsetY+"px";
    draggingItem.style.left=offsetX+"px";
    document.getElementById("touch-card").classList.remove("d-none");
    document.getElementById("touch-overflow").style.zIndex=2;
    

}

function moveTouch(event) {
  if (!draggingItem) return;
  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;
  const deltaX = currentX - initialX;
  const deltaY = currentY - initialY;
  document.body.style.overflow = 'hidden'; 
  draggingItem.style.left = (offsetX + deltaX) + "px";

  draggingItem.style.top = (offsetY + deltaY) + "px";
  markTouchedContainer(event)
}

function markTouchedContainer(event) {
    let container=getTargetElement(event);
    if (container) {
        touchHighlight=container;
        // container.style.border="2px solid red";
        container.classList.toggle("task-border",true)
    } else 
    if (touchHighlight != null) {
        touchHighlight.classList.toggle("task-border",false)
        // touchHighlight.style.border="";
        touchHighlight=null;
    }
}

/**
 * 
 * @param {event} event touchend - Release Touch screen 
 * @returns 
 */
function getTargetElement(event) {
    const touch = event.changedTouches[0];
    draggingItem.style.pointerEvents = "none";
    let targetElement=document.elementFromPoint(touch.clientX, touch.clientY);
    draggingItem.style.pointerEvents = "auto";
    if (targetElement != null && !targetElement.classList.contains("containers")) targetElement=targetElement.closest(".containers");    
    return targetElement;
}

async function refreshTask(target) {
    let status=target.id.replace("-container","");
    let id=+originalItem.id.replace("task-","");
    tasks=await loadData("taskstorage");
    let index=tasks.findIndex(e=> e.id==id);
    if (index != -1){
        tasks[index].status=status;
        saveData("taskstorage",tasks);
    }
}

function endTouch(event) {
    let targetElement=getTargetElement(event);
    let orgElement=originalItem.closest(".containers");
    
    if (targetElement != orgElement) {
        if (targetElement != null && orgElement != null) {
            targetElement.appendChild(originalItem);
            refreshTask(targetElement);
        }
    } 
    document.getElementById("touch-card").innerHTML="";
    document.getElementById("touch-card").classList.add("d-none");
    draggingItem = null;
    originalItem = null;
}