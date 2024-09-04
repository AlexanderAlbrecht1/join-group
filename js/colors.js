function generateDarkColor() {
    const r = Math.floor(Math.random() * 129); // R=0-128
    const g = Math.floor(Math.random() * 129); // G=0-128
    const b = Math.floor(Math.random() * 129); // B=0-128
    return `rgb(${r}, ${g}, ${b})`;
 }

 function getColor() {
    return generateDarkColor();
 }