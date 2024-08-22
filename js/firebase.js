function getPath(table) {
    let url="https://join-group-10487-default-rtdb.europe-west1.firebasedatabase.app/";
    let project="join-group/";

    let path=url+project+table+".json";
    return path;
}

/* 
    Same as Above
*/
function getPathInOneLine() {
    let url="https://myproject-749a6-default-rtdb.europe-west1.firebasedatabase.app/join-group/user.json";
    return url;
}

async function getResponse(table,options) {
    let url=getPath(table);
    try {
        if (options != null) {
            response = await fetch(url,options);
        } else  {
            response = await fetch(url);
        }
        if (response.ok) { // 404 = Seite nicht vorhanden, OK = 2XX = OK
            return response.json();
        } else {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
        return false;
    }
    return false;

}

async function loadData() {
    let options={
        method: "GET",
        header: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };
    return await getResponse(options);
}
 

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
