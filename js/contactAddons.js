/**
 * 
 * PUBLIC
 * 
 * Generates a full name of the Object contact
 * 
 * @param {object} contact - one Contact
 * @returns - the Full name as string
 */
function getFullNameInContact(contact) {
    let name=contact.name + " " + contact.lastname;
    //if (name == getLoginname()) name+=" (You)";
    return name;
}