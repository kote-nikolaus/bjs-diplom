'use strict';

let userForm = new UserForm();

function loginFormCallback(data) {
  ApiConnector.login(data, authorizationCallback);
}

function authorizationCallback(response) {
  if (response.success) {
    location.reload();
  } else {
    userForm.setLoginErrorMessage('Ошибка!');
  }
}

function registerFormCallback(data) {
  ApiConnector.register(data, registrationCallback);
}

function registrationCallback(response) {
  if (response.success) {
    location.reload();
  } else {
    userForm.setRegisterErrorMessage(response.data);
  }
}

userForm.loginFormCallback = loginFormCallback;
userForm.registerFormCallback = registerFormCallback;
