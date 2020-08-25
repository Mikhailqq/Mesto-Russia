class Popup{

	constructor(popup) {
		this.popup = popup;
		/*
			Можно лучше: обработчик на кнопку закрытия попапа вешать в классе Popup
			this.close = this.close.bind(this);    //привязываем контекст, чтобы использовать this в обработчике событий
        	this.popup.querySelector('.popup__close').addEventListener('click', this.close);
		*/
	}

	open(){
		this.popup.classList.add("popup_is-opened");
	}

	close(){
		this.popup.classList.remove("popup_is-opened");
	}	
}