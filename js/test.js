async function x() {
    let b = [
        { id: 2, vorname: "Jörg", nachname: "Deymann" },
        { id: 5, vorname: "Klaus", nachname: "Bärbel" },
        { id: 10, vorname: "Sandra", nachname: "Quast" }
     ];

     await saveObjectData("test",b);

     let c=await loadObjectData("test");
     console.log(c); 

     let d=await loadObjectDataById("test",5);
     console.log(d);
     
     d[0].vorname="Jens";
     await saveObjectDataById("test",d,5);
 


    //    let d=await loadData("Contacts");
//     console.log(d);

// let path=url+project+table+".json"/* +`?orderBy="id"&equalTo=${10}"`*/;
//return path;
 

    // let xxx=await loadData("Contacts");
 }
 

/*
 console.log("Halo");
 function f1() {
    let b = [
       { id: 2, vorname: "Jörg", nachname: "Deymann" },
       { id: 5, vorname: "Klaus", nachname: "Bärbel" },
       { id: 10, vorname: "Sandra", nachname: "Quast" }
    ];

    // Umwandlung in ein Objekt
    let transformedObject = Object.fromEntries(
       b.map(item => [item.id, { vorname: item.vorname, nachname: item.nachname }])
    );
 }

 function f2() {
    let b = [
       { id: 2, vorname: "Jörg", nachname: "Deymann" },
       { id: 5, vorname: "Klaus", nachname: "Bärbel" },
       { id: 10, vorname: "Sandra", nachname: "Quast" }
    ];

    // Umwandlung in ein Objekt
    let transformedObject = Object.fromEntries(
       b.map(item => [item.id, { vorname: item.vorname, nachname: item.nachname }])
    );
 }

 function f3() {
    let b = [
       { id: 2, vorname: "Jörg", nachname: "Deymann" },
       { id: 5, vorname: "Klaus", nachname: "Bärbel" },
       { id: 10, vorname: "Sandra", nachname: "Quast" }
    ];

    let transformedObject = Object.fromEntries(
       b.map(({ id, ...rest }) => [id, rest])
    );
 }







 console.log("Halo");
 let a = {
    2: { vorname: "Jörg", nachname: "Deymann" },
    5: { vorname: "Klaus", nachname: "Bärbel" }
 };

 // console.log(Object.entries(a));


 let b = [
    { id: 2, vorname: "Jörg", nachname: "Deymann" },
    { id: 5, vorname: "Klaus", nachname: "Bärbel" },
    { id: 10, vorname: "Sandra", nachname: "Quast" }
 ];
 console.log(Object.fromEntries(b));

 console.log(b.map(item => [item.id, { vorname: item.vorname, nachname: item.nachname }]));
 obj=Object.fromEntries(
    b.map(item => [item.id, { vorname: item.vorname, nachname: item.nachname }])
 );
*/
