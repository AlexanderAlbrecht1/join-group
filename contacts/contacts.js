let contacts = [
    { name: "Zoe", lastname: "Zimmerman", email: "zoe.zimmerman@example.com" },
    { name: "Anna", lastname: "Anderson", email: "anna.anderson@example.com" },
    { name: "Ben", lastname: "Baker", email: "ben.baker@example.com" },
    { name: "Clara", lastname: "Carter", email: "clara.carter@example.com" },
    { name: "David", lastname: "Dawson", email: "david.dawson@example.com" },
    { name: "Emma", lastname: "Evans", email: "emma.evans@example.com" },
    { name: "Felix", lastname: "Foster", email: "felix.foster@example.com" },
    { name: "Greta", lastname: "Gibson", email: "greta.gibson@example.com" },
    { name: "Hans", lastname: "Hansen", email: "hans.hansen@example.com" },
    { name: "Iris", lastname: "Irving", email: "iris.irving@example.com" },
    { name: "Julia", lastname: "Jones", email: "julia.jones@example.com" },
    { name: "Karl", lastname: "King", email: "karl.king@example.com" },
    { name: "Lena", lastname: "Lewis", email: "lena.lewis@example.com" },
    { name: "Max", lastname: "Miller", email: "max.miller@example.com" },
    { name: "Nina", lastname: "Nelson", email: "nina.nelson@example.com" },
    { name: "Oliver", lastname: "Owen", email: "oliver.owen@example.com" },
    { name: "Paula", lastname: "Parker", email: "paula.parker@example.com" },
    { name: "Yara", lastname: "Young", email: "yara.young@example.com" },
    { name: "Quinn", lastname: "Quincy", email: "quinn.quincy@example.com" },
    { name: "Rita", lastname: "Roberts", email: "rita.roberts@example.com" },
    { name: "Sam", lastname: "Smith", email: "sam.smith@example.com" },
    { name: "Tina", lastname: "Thompson", email: "tina.thompson@example.com" },
    { name: "Uwe", lastname: "Ulrich", email: "uwe.ulrich@example.com" },
    { name: "Vera", lastname: "Vaughn", email: "vera.vaughn@example.com" },
    { name: "Walter", lastname: "Wilson", email: "walter.wilson@example.com" },
    { name: "Xenia", lastname: "Xander", email: "xenia.xander@example.com" },
  ];

  function loadContacts() {
    document.getElementById('showContacts').innerHTML = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let name = contact.name;
        let lastname = contact.lastname;
        let mail = contact.email
        let initial1 = Array.from(name)[0];
        let initial2 = Array.from(lastname)[0];
        
        document.getElementById('showContacts').innerHTML += `
        <div class="contact" id="contact${i}">
            <div class="icon${i}">
                <span>${initial1}${initial2}</span>
            </div>
            <div class="nameAndMail" id=""nameAndMail{i}"">
                <span>${name} ${lastname}</span>
                <span>${mail}</span>
            </div>
        </div>
        `;
    }
  }

  function sortContacts(){
    contacts.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    console.log(contacts);

  }
  