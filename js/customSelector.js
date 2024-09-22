let unalowedSpace=false;
 
function findTag(element,tagname) {
    while(element != null) {
       if (element.nodeName == tagname.toUpperCase()) return element;
       element=element.parentElement;
    }
    return false;
}


function preventSpaceToggle(event) {
    const activeElement = document.activeElement;
 
    if (unalowedSpace && activeElement.tagName.toLowerCase() === 'input' && activeElement.type === 'text') {
        event.preventDefault();  
        unalowedSpace = false;
    }

}


 function addToggleSelectListener() {
    document.querySelector('details').addEventListener('click', function(event) {
        const activeElement = document.activeElement;
 
        // If Space key was pressed and input is focused, prevent toggle
        if (unalowedSpace && activeElement.tagName.toLowerCase() === 'input' && activeElement.type === 'text') {
            event.preventDefault();  // Prevent the toggle
            unalowedSpace = false;   // Reset the flag after preventing
        }
    
     /**
     * 
     * Close Dropdown Window if clicked out of the window
     * 
     */
     window.onclick = function(event) {
    
       let element=findTag(event.target,"details");
       if (!element) {
          for (let element of document.querySelectorAll('details')) {
             element.open=false;
          };
 
       }
    }
 
 
 });
 
 document.addEventListener('keydown', function(event) {
     if (event.code === 'Space') {
         unalowedSpace = true; // Set the flag when Space key is pressed
     }
 });
 }

 function initSelector() {
    // document.querySelector('details').open = false;
    addToggleSelectListener(); 
    
 }
 