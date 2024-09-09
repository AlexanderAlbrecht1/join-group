/**
 * Let a Msg fly form Bottom to Center 
 * Time 900ms
 * Wait after 800ms
 * Together 1700ms until continue
 */
async function msgfly() 
{
    document.querySelector(".msgflydisable").disable;
    let msgfly=document.getElementById("msgfly");
    msgfly.style.visibility="visible";
    msgfly.querySelector(".msgfly").style.transform="translateY(0)";
    // msgfly.querySelector(".msgfly").classList.add("msgflyin");
    await new Promise(e => setTimeout(e,1700));
}