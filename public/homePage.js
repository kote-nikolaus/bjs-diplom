'use strict';

//Выход из личного кабинета

let logoutButton = new LogoutButton();

logoutButton.action = logoutRequest;

function checkLogout(response) {
  if (response.success) {
    location.reload();
  }
}

function logoutRequest() {
  ApiConnector.logout(checkLogout);
}

//Информация о пользователе

ApiConnector.current(checkUser);

function checkUser(response) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
}

//Курсы валют

let ratesBoard = new RatesBoard();

function getStocks() {
  ApiConnector.getStocks(checkStocks);
}

function checkStocks(response) {
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
}

setInterval(getStocks, 60000);

//Операции с деньгами

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = addMoneyRequest;

function addMoneyRequest(data) {
  ApiConnector.addMoney(data, checkMoney);
}

moneyManager.conversionMoneyCallback = conversionMoneyRequest;

function conversionMoneyRequest(data) {
  ApiConnector.convertMoney(data, checkMoney);
}

moneyManager.sendMoneyCallback = sendMoneyRequest;

function sendMoneyRequest(data) {
  ApiConnector.transferMoney(data, checkMoney);
}

function checkMoney(response) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(false, 'Успешно!');
  } else {
    moneyManager.setMessage(true, response.data);
  }
}

//Работа с избранным

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(checkFavorites);

function checkFavorites(response) {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
}

favoritesWidget.addUserCallback = addUserRequest;

function addUserRequest(data) {
  ApiConnector.addUserToFavorites(data, checkFriend);
}

function checkFriend(response) {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(false, 'Успешно!');
  } else {
    favoritesWidget.setMessage(true, response.data);
  }
}

favoritesWidget.removeUserCallback = removeUserRequest;

function removeUserRequest(data) {
  ApiConnector.removeUserFromFavorites(data, checkFriend);
}
