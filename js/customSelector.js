let unalowedSpace=false;


/**
 * 
 * PUBLIC
 * 
 * Init must be called, at beginning
 */
function initSelector() {
    addToggleSelectListener();     
 }


 /**
 * 
 * PRIVATE 
 * 
 * Find a Tagname in Father oder higher Level
 * i found a funcition that is similar : closest("tag/id/class")
 * @param {element} element - element to begin search
 * @param {String} tagname - classname
 * @returns - found element, else false (better would have been null)
 */
function findTag(element,tagname) {
    while(element != null) {
       if (element.nodeName == tagname.toUpperCase()) return element;
       element=element.parentElement;
    }
    return false;
}


/**
 * 
 * PRIVATE EVENT
 * 
 * Do not Toggle Window, when Space is pressed
 * 
 * @param {event} event - event of the "detail"- tag
 */
function preventSpaceToggle(event) {
    const activeElement = document.activeElement;
    if (unalowedSpace && activeElement.tagName.toLowerCase() === 'input' && activeElement.type === 'text') {
        event.preventDefault();  
        unalowedSpace = false;
    }
}


/**
 * 
 * PRIVATE EVENT
 * 
 * Closes the details-Window when clicked outside
 * 
 * @param {event} event - Close window on Click outside
 */
function detailsEventCloseWindow(event) {
    let element=findTag(event.target,"details");
    if (!element) {
        for (let element of document.querySelectorAll('details')) {
            element.open=false;
        };
    }
}


/**
 * 
 * PRIVATE EVENT
 * 
 * Disables the Window Toggle via Space Key
 * 
 * @param {event} event - Close window on Click outside
 */
function detailsEventKey(event) {
    if (event.code === 'Space') {
        unalowedSpace = true; // Set the flag when Space key is pressed
    }
};


/**
 * 
 * PRIVATE EVENT
 * 
 * Updates the Selected Monogramlist, when closed
 * Focus the Inputrfield, Opened
 * 
 * @param {event} event - Toggle Event 
 */
function detailsEventToggle(event) {
    let root=event.target;
    if (!root.open) {
        displaySelectorMonograms(event);
    } else {
        event.currentTarget.querySelector("INPUT").focus();
    }
}


/**
 * 
 * PRIVATE EVENT
 * 
 * Main Click Event, a summery of Events
 * If Space key was pressed and input is focused, prevent toggle
 * 
 * @param {*} event - Klick Event
 */
function detailsEventClick(event) {
    const activeElement = document.activeElement;
    if (unalowedSpace && activeElement.tagName.toLowerCase() === 'input' && activeElement.type === 'text') {
        event.preventDefault();  
        unalowedSpace = false;  
    }
    window.onclick   = detailsEventCloseWindow(event); 
    window.onkeydown = detailsEventKey(event);
}


/**
 * 
 * PUBLIC
 * 
 * Add all Listener for Select Input
 * 
 * @param {string} rootId - The ID given to details if you have onle one, it can be empty 
 */
function addToggleSelectListener(rootId) {
    let root=document.querySelector('details');
    if (rootId != null) {
        root=document.getElementById(rootId);
    }
    root.addEventListener('click', detailsEventClick);
    root.addEventListener('toggle', detailsEventToggle);
    root.querySelector("INPUT").addEventListener('input', filterSelector);
}

 
/**
 * 
 * PRIVATE 
 * 
 * Displays all activated monograms in one Row
 *  
 * @param {event} event - Displays all activated monograms  in a row
 */
function displaySelectorMonograms(event) {
    let checkboxes=Array.from(event.currentTarget.querySelectorAll('input[name="assign"]'));
    let checked=checkboxes.filter(e => e.checked);
    let monogramList=event.currentTarget.parentElement.nextElementSibling; // .querySelector("monogram-list");
    monogramList.innerHTML="";
    checked.forEach (checkbox => {
        let monogram=checkbox.parentElement.querySelector("SPAN").cloneNode(true);
        monogramList.appendChild(monogram);
    })
}


/**
 * 
 * PUBLIC
 * 
 * reduce the amout of List of the Selector. Its a filter by typing Letters
 * 
 * @param {event} event - input Event form Selector  
 */
function filterSelector(event) {
    if (document.activeElement.tagName != "INPUT") return;
    let search=document.activeElement.value.toLowerCase();
    let names=Array.from(event.target.closest("DETAILS").querySelectorAll('.selector-name'));
    names.filter(e => {
        if (e.innerHTML.toLowerCase().includes(search)) {
            e.closest(".selector").classList.remove("d-none");
        } else {
            e.closest(".selector").classList.add("d-none");
        }
        return true;
    });
} 
