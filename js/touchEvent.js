let initialX, initialY, offsetX, offsetY;
let draggingItem = null;
let originalItem = null;

function startTouch(event) {  
    originalItem=event.target.closest(".card");
    cloneItem = originalItem.cloneNode(true);
    document.getElementById("touch-card").append(cloneItem);
    draggingItem=document.getElementById("touch-card");
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
    offsetX=originalItem.getBoundingClientRect().x; 
    offsetY=originalItem.getBoundingClientRect().y; 
    draggingItem.style.top=offsetY+"px";
    draggingItem.style.left=offsetX+"px";
    document.getElementById("touch-card").classList.remove("d-none");
}

function moveTouch(event) {
  if (!draggingItem) return;
  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;
  const deltaX = currentX - initialX;
  const deltaY = currentY - initialY;
  draggingItem.style.left = (offsetX + deltaX) + "px";
  draggingItem.style.top = (offsetY + deltaY) + "px";
}

function endTouch(event) {
    newElement=event.target.closest(".containers");
    orgElement=originalItem.closest(".containers");
    if (newElement != orgElement) {
        newElement.appendChild(originalItem);
        // Render
        // addContainerData(tasks,status)
    } 
    document.getElementById("touch-card").innerHTML="";
    document.getElementById("touch-card").classList.add("d-none");
    draggingItem = null;
    originalItem = null;
}