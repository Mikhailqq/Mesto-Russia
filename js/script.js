(function () {
 const list = document.querySelector(".places-list")
 
 const plusForm = document.forms.new;
 const editForm = document.forms.edit;
 
 const plusButton = document.querySelector(".user-info__button");
 const editButton = document.querySelector(".user-info__edit");
 
 const closePopupPlus = document.querySelector(".popup__close_plus");
 const closePopupEdit = document.querySelector(".popup__close_edit");
 const closePopupPicture = document.querySelector(".popup__close_picture");
 
 const infoName = document.querySelector(".user-info__name");
 const infojob = document.querySelector(".user-info__job");
 const fullName = document.querySelector(".popup__input_type_figure");
 const userJob = document.querySelector(".popup__input_type_job");
 
 const newPlaceCard = (...arg) => new Card(...arg).create();
 
 const popupPlus = new Popup(document.querySelector(".popup__plus"));
 const popupEdit = new Popup(document.querySelector(".popup__edit"));
 const popupPicture = new Popup(document.querySelector(".popup__picture"));
 
 const cardList = new CardList(list);
 cardList.render(initialCards, newPlaceCard); 
 
 
 const userInfo = new UserInfo(infoName, infojob); 
 userInfo.setUserInfo(infoName.textContent, infojob.textContent)
 
 
 
 const plusFormValidator = new FormValidator(plusForm) 
 plusFormValidator.setEventListeners();
 
 const editFormValidator = new FormValidator(editForm) 
 editFormValidator.setEventListeners();
 // слушатель на попап-форму профиля и открытие при клике
 editButton.addEventListener('click', function() {  
   const getUserInfo = userInfo.getUserInfo();
   fullName.value = getUserInfo.name;  
   userJob .value = getUserInfo.job;
   popupEdit.open();   
   
 });
 //слушатель на попап-форму карточки и открытие при клике
 plusButton.addEventListener('click',function() {  
   popupPlus.open();   
   
 });
 // слушатель на крестике: по клику закрывает попап-форму и очищает ее 
 closePopupPlus.addEventListener('click', function() {  
     popupPlus.close();
     plusForm.reset();
     plusFormValidator.resetError()    
 }); 
 // слушатель на крестике: по клику закрывает попап-форму профиля и очищает ее 
 closePopupEdit.addEventListener('click', function() {
   debugger;
   popupEdit.close();
   editFormValidator.resetError() 
 }); 
 //открытие попапа с пикчей
   /*
     Можно лучше:
     отказаться от делегирования т.к. сейчас данные о структуре карточки протекли во вне класса Card
     лучше вешать обработчик на сам элемент карточки и передават в класс Card
     колбэк который вызывает открытие попапа, примерно так
       function openImagePopup(imageUrl) {
         const popupImg = document.querySelector(".popup__image");    
         const picture = target.dataset.url;
         popupImg.src = picture;   
         openPopup(popupPicture);
       }
 
       //в класс карточки передается колбэк, теперь карточка не знает как устроен попап изображения
       //она просто вызывает переданный ей колбэк передавая в него url картинки
       class Card {
       constructor(name, link, openImageCallback) {
           ........
           this.openImageCallback = openImageCallback;
           this.openImage = this.openImage.bind(this);
           ........
       }
 
       openImage() {
           this.openImageCallback(this.link);
       }
 
   */
 list.addEventListener('click', function(event) {
   const target = event.target;
   if (target.classList.contains("place-card__image")) {        
     popupPicture.open();
     const popupImg = document.querySelector(".popup__image");    
     const picture = target.dataset.url;
     popupImg.src = picture;    
   };
 })
 // закрытие попапа с пикчей
 closePopupPicture.addEventListener('click', function(event) {
   popupPicture.close()
 })
 
 // работа с формами
 plusForm.addEventListener('submit', function() {
   event.preventDefault();
   const isValid = plusFormValidator.checkFormValid();
   if (isValid) {
    const card = {
       name: plusForm.elements.name.value,
       link: plusForm.elements.link.value
     };
     
     cardList.addCard(newPlaceCard(card));
     plusForm.reset();    
     popupPlus.close();
   }
 })
 
 editForm.addEventListener('submit', function() {
   event.preventDefault();
   const isValid = editFormValidator.checkFormValid();
 
   if (isValid) {
     userInfo.setUserInfo(fullName.value, userJob.value);
     userInfo.updateUserInfo();
     popupEdit.close()
 
   }
 })
})();

/*
  Надо исправить: обработчики на форму должны вешаться классом FormValidator
  см. подробнее комментарий в классе FormValidator +

  Не исправлено: обработчики событий должны вешаться на форму в классе FormValidator +
  в методе setEventListeners:
  this.form.addEventListener('input', () => {
    this.checkValidate();
  })

  В файле script.js должен только создаваться экземпляр класса валитора и вызываться 
  метод setEventListeners
  const editFormValidator = new FormValidator(editForm) 
  editFormValidator.setEventListeners(); //активируем валидацию формы +
*/
// слушатели на инпуты форм для добавления ошибок
// plusForm.addEventListener('input', function(event) {
//   plusFormValidator.checkValidate()
// })
// editForm.addEventListener('input', function(event) { 
//   editFormValidator.checkValidate()
// })

/*
Неплохая работа, рефакторинг выполнен, необходимые классы созданы, но есть несколько замечаний:

Надо исправить: 
- не нужно создавать функции openPopup closePopup cleanError newUserInfo setUserInfo которые создают экземпляры классов +
- не хардкодить шаблон карточки в Card, а передавать как параметры конструктора +
- при удалении карточки нужно так же удалить обработчики событий с её элементов +
- this.getPopupPicture нет в классе Card, хотя обработчик вешается +
- из названия метода setEventListeners значит что он навешивает обработчик, а не является им
- не хардкодить DOM элементы в UserInfo, а передавать как параметры конструктора +
- в методы setUserInfo updateUserInfo данные передавать как параметры метода +
- при открытии попапа профиля подставлять в поля формы ранее сохраненные данные +
- если добавить одну карточки и повторно открыть попап, то кнопка отображается как активная, хотя поля пустые +

Можно лучше: 
- обработчик на кнопку закрытия попапа вешать в классе Popup
- отказаться от делегирования открытия попапа и вешать обработчик на саму картинку

*/

/*

Часть замечаний исправлено, но некоторые исправлены несовсем верно:

Надо исправить: 
- не хардкодить шаблон карточки в Card, а передавать как параметры конструктора (не исправлено с прошлого ревью)   +
- при удалении карточки удалять обработчики событий с её элементов (сейчас удаление выполняется не корректно)      +
- обработчики на форму должны вешаться классом FormValidator                                                       +
- в методе setEventListeners в обработчике должен вызываться checkValidate , а не setSubmitButtonState             +
- в методы setUserInfo updateUserInfo передавать значения и в методах использовать переданные значения 
  (сейчас в методы добавлены параметры, но они никак не используются)                                              +
- когда код расположен в разных файлах, его нужно                                                                  +                                               
заключать в модули, т.к. если файлов будет много, то в разных 
файлах могут появится функции или переменные с одинаковыми именами,
они будут переопределять друг друга. Модуль должен предоставлять
наружу только минимально необходимый api
Для создании модулей можно воспользоваться IIFE, подробнее:
https://learn.javascript.ru/closures-module
https://habr.com/ru/company/ruvds/blog/419997/ 
Нужно обернуть в модули как минимум содержимое файла script.js
Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов
(приношу изинения пропустил это замечание на первом ревью)                                                         +

Еще несколько можно лучше:
- в класс Card лучше передавать не отдельные параметры, а сразу весь объект с данными карточки                     +
- при удалении карточки так же очищать ссылку на её DOM элемент +
- передавать newPlaceCard в конструктор класса, а не в render
- сообщения об ошибках вынести в отдельный объект и передавать этот объект в конструктор класса

*/

/*
  Отлично, все критические замечания исправлены

  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!

*/