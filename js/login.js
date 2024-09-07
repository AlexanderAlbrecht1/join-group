function isFormValid(formqs) {
   let form = document.querySelector(formqs);
   if (!form) return false;

   let inputs = form.querySelectorAll('input');
   let status = Array.from(inputs).findIndex(input => !input.checkValidity()) == -1;
   return status;
} 
