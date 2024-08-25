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
            return response.json();
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
        header: {
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
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    return await getResponse(table,options);    
}


/**
 * Returns the next available ID of a Table
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
