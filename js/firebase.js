/**
 * Returns the full path of the table in the firebase
 * 
 * @param {object} table 
 * @returns - full path of the table in the firebase
 */
function getPath(table) {
    let url="https://join-group-10487-default-rtdb.europe-west1.firebasedatabase.app/";
    let project="join-group/";

    let path=url+project+table+".json";
    return path;
}


/**
 * fetch action
 * 
 * @param {string} table   - name of table or key
 * @param {object} options - get / put / UFT-8
 * @returns {object} - answer with content of file
*/
async function fetchUrl(table,options) {
    let url=getPath(table);
    if (options != null) {
        response = await fetch(url,options);
    } else  {
        response = await fetch(url);
    }
    return response;
}


/**
 * fetch an url, translate to a json and give it back
 * @param {string} table   - name of table or key
 * @param {object} options - get / put / UFT-8
 * @returns - json array, false, if fails 
 */
async function getResponse(table,options) {
    try {
        response=await fetchUrl(table,options);
        if (response.ok) { // 404 = page does not exist, 2XX = OK 
            const data= response.json();
            if (Array.isArray(data)) {
                return data.filter(item => item !== null); // Filtere `null`-Werte
            } else {
                return data; // Bei Objekten, die möglicherweise nicht als Array vorliegen
            }
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
}


/**
 * Userinterface for fetching Data
 * 
 * @returns {object} - JSON arrary of data
 */
async function loadData(table) {
    let options={
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };
    return await getResponse(table,options);
}
 

/**
 * Userinterface for saving Data overwrite
 * 
 * @param {string} table - table or key
 * @param {object} data  - json array
 * @returns {object} - false if failes, true if succes
 */
async function saveData(table,data = {}) {
    let options=  {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    return await getResponse(table,options);    
}


/**
 * Returns the next available ID of a Table by iterating
 * 
 * @param {object} data JSON Arra width Data that contains id 
 * @returns - highest ID + 1
 */
function getNewId(data) {
    if (data.length == 0) return -1;
    let max=0;
    for (let i=0;i<data.length;i++) {
        if (data.id>max) max=+data.id;
    }
    return max+1;
}


/**
 * 
 * Returns the saved Highes Id of a database table
 * the higest id we store in a seperate File
 * 
 * @param {string} table - the name of the table the id we use from
 * @returns -  the saved Highes Id of a database table
 */
async function getHighestId(table) {
    let setupContact=await loadData(`tablesetup/${table}`);
    if (setupContact == null) return 0;
    return setupContact.lastId;
 }
 

/**
 * 
 * saves the new id in the setuptable
 * @param {string} table 
 * @param {integer} id 
 * @returns 
 */
 async function setHighestId(table,id) {
    let row={lastId:id};
    await saveData(`tablesetup/${table}`,row);
    return;
 }
 

/**
 * 
 * increments the Id of a table and gives back th highest id + 1
 * then we returns the ne id  
 * the higest id we store in a seperate File
 * 
 * @param {string} table - the name of the table the id we use from
 * @returns -  the saved Highes Id of a database table 
 */
async function getIncrementedId(table) {
    let id=await getHighestId(table)+1;
    await setHighestId(table,id);
    return id;
 }
 

 async function getDatasetById(table,id) {
    let content=loadData(table+"/"+id);

 }
