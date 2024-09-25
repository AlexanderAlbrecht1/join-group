function openUserMenu() {
    document.getElementById('popUpUser').classList.toggle('dFlex');
}

function logOut() {
    localStorage.removeItem(PROJECT);
    sessionStorage.removeItem(PROJECT);
    isLogged();
}