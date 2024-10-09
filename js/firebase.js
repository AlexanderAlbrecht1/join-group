/**
 * Returns the full path of the table in the firebase
 * 
 * @param {object} table 
 * @returns - full path of the table in the firebase
 */
function getPath(table,id=null) {
    let url='https://join-group-10487-default-rtdb.europe-west1.firebasedatabase.app/';
    let project='join-group/';
    let where= id==null?"":`?orderBy="id"&equalTo=${id}`;
    let path=url+project+table+".json"+where;// +`?orderBy="id"&id=10`;
    return path;
}


/**
 * fetch action
 * 
 * @param {string} table   - name of table or key
 * @param {object} options - get / put / UFT-8
 * @returns {object} - answer with content of file
*/
async function fetchUrl(table,options,id=null) {
    let url=getPath(table,id);
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
async function getResponse(table,options,id=null) {
    try {
        response=await fetchUrl(table,options,id);
        if (response.ok) { // 404 = page does not exist, 2XX = OK 
            const data= response.json();
            return data; // Bei Objekten, die möglicherweise nicht als Array vorliegen
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
async function loadData(table,id=null) {
    let options={
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };
    let data=await getResponse(table,options,id);
    if (Array.isArray(data)) data = data.filter(element => element !== null);

    return data;
}

/**
 * 
 * Userinterface for fetching Data DELETE
 * 
 * Explanaition:
 *      we need to get the key from the Id, to delete by key
 *      It ist not possible to delete by a given Id 
 * 
 * We need first to get 
 * @returns {object} - JSON arrary of data
 */
async function deleteData(table,id=null) {
    let json=await loadData(table,id);
    table+="/"+Object.keys(json)[0];
    let options={
        method: "DELETE",
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
async function saveData(table,data = {},id=null) {
    let options=  {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };
    return await getResponse(table,options,id);    
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
        if (data[i].id>max) max=+data[i].id;
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

 async function saveObjectData(table,data) {
    await saveData(table,arrayToObject(data));
} 

async function saveObjectDataById(table,data) {
    promises=[];
    for (let d of data) {
        promises.push(saveData(`${table}/${d.id}`,d));
    }
    await Promise.all(promises);
} 

async function loadObjectData(table) {
    return Object.values(await loadData(table));
} 

async function loadObjectDataById(table,id=null) {
    return Object.values(await loadData(table,id));
} 

function arrayToObject(array) {  
    return array.reduce((result, item) => {
        if (item && typeof item === 'object' && item.id != null) {      
            result[item.id] = item;
        }
        return result;  
    }, {});
}

/**
 * Firebas Authenificatione
 * {
 *      "rules": {
 *          ".read": "auth != null",
 *          ".write": "auth != null"
 *      }
 * }
 * 
 */
/*
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Benutzer registriert:", user);
  })
  .catch((error) => {
    console.error("Fehler bei der Registrierung:", error.message);
});
*/

/*
function convertToTable(jsonArray) {
    let data  = Object.fromEntries(
        jsonArray.map(({id, ...other}) => [id, other])
    ); 
    
    // data=Object.fromEntries(
    //     jsonArray.map(item => [item.id, { vorname: item.vorname, nachname: item.nachname }])
    // );
    
    return data;
}


function convertfromTable(jsonArray) {
    let jsonArray = Object.entries(data).map(([id, rest]) => {
        return { id: Number(id), ...rest };
    });
    return jsonArray;
}

async function saveIndexedData(table,jsonArray) {
    data=convert2Table(jsonArray);
    await saveData(table,data);

}

async function loadIndexedData(table) {
    data=await loadData(table+"/"+id);
    jsonArray=convertfromTable(data);
    return jsonArray;
}

async function saveDataById(table,id,jsonArray) {
    data=convert2Table(jsonArray);
    await saveData(table+"/"+id,data);
}

async function loadDataById(table,id) {
    data=await loadData(table+"/"+id);
    jsonArray=convertfromTable(data);
    return jsonArray;
}
    */