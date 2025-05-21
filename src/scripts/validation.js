export {enableValidation, clearValidation};

function showInputError (validationConfig, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.inputErrorClass);
};
  
function hideInputError(validationConfig, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.errorClass);
    errorElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
};

function checkInputValidity(validationConfig, formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationConfig, formElement, inputElement);
    }
};

function setEventListeners(validationConfig, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(validationConfig, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(validationConfig, formElement, inputElement)
        toggleButtonState(validationConfig, inputList, buttonElement)
      });
    });
  }; 

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(validationConfig, formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function toggleButtonState(validationConfig, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

function clearValidation(form, validationConfig, buttonElement) {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
    hideInputError(validationConfig, form, inputElement);
    buttonElement.disabled = true;
  })
}