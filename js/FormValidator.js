class FormValidator {

	constructor (form){// аргумент принимает: элемент формы или элемент попапа, внутри которого находится эта форма
		this.form = form;    
	}

	checkInputValidity(input){
 
   if (input.validity.valueMissing) {
      /*
        Можно лучше: сообщения об ошибках вынести в отдельный объект, а не хардкодить их в функции
        Если понадобится перевести приложение на другой язык можно будет передавать функции другой объект
        errorMessages = {
          empty: 'Это обязательное поле',
          wrongLength: 'Должно быть от 2 до 30 символов'
          ......
        }
        И передавать этот объект в конструктор класса FormValidator
      */

      input.setCustomValidity('Это обязательное поле');
      return false 
     }      
   if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false
     }     
   if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false
   }

    input.setCustomValidity("");
    return true
	}

	setSubmitButtonState(button, state){
		if (state) {
        button.removeAttribute('disabled');         
    } else {
        button.setAttribute('disabled', true);          
    }
	}

	setEventListeners(event){//добавлять обработчики
    this.form.addEventListener("input", () => {
     this.checkValidate();     
    });
  }

	resetError(){ 
		const errors = document.querySelectorAll(".error");
   errors.forEach (function(elem) {
   elem.textContent = "";
  })
	}

	checkFieldValid(input) {
    const errorElem = input.closest(".popup__form").querySelector(`#${input.id}-error`);  
    const valid = this.checkInputValidity(input);  
    errorElem.textContent = input.validationMessage;
    return valid
	}

  checkFormValid() {

    const inputs = [...this.form.elements];
    let valid = false;
  
    inputs.forEach(input => {
      if (input.type !== 'submit' && input.type !== 'button') {
        if (this.checkFieldValid(input)) valid = true;
      }
    });
  
    return valid;
  }  


  checkValidate() {  
    const button = this.form.querySelector(".popup__button");
    const inputs = [...this.form.elements];
  
    this.checkFieldValid(event.target);
  
    if (inputs.every(this.checkInputValidity)) {

      this.setSubmitButtonState(button, true);
    } else {
      this.setSubmitButtonState(button, false);
    }
}

}