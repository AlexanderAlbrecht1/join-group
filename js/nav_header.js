function openUserMenu() {
    document.getElementById('popUpUser').classList.toggle('dFlex');
}

function logOut() {
    localStorage.removeItem(PROJECT);
    sessionStorage.removeItem(PROJECT);
    isLogged();
}

function initSessionMonogram() {
    isLogged();
    logedUserMonogram();
}

function checkUser(url) {
    if (getUsername() === "guest") {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}

/**
 *
 * returns the monogram of a Name
 *
 * @param {string} name first name and last name split by " "
 * @returns the first characters of the 2 first Names in uppercase
 */
function getMonogram(name) {
    let na = name.toUpperCase().split(' ', 2);
    if (na.length == 1) {
        return na[0][0];
    } else {
        return na[0][0] + na[1][0];
    }
}