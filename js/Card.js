
class Card {  
	/*
		Можно лучше: шаблон передается в конструктор, он теперь здесь не нужен
	*/
	static _template = document.querySelector("#card-template").content;

	constructor(item, template) {							
		this.item = item;				
		this._template = template;
	}

	like() {		
    	this.classList.toggle("place-card__like-icon_liked")  
	}

	remove = (event) => {    
		this._view.remove();		
		this._view.querySelector(".place-card__delete-icon").removeEventListener('click', this.remove);
		this._view.querySelector(".place-card__like-icon").removeEventListener('click', this.like);
		this._view = null;
	}  

	create() {
		this._view = Card._template.cloneNode(true).firstElementChild;
		this._view.querySelector(".place-card__image").style.backgroundImage = `url(${this.item.link})`;
		this._view.querySelector(".place-card__image").setAttribute("data-url", `${this.item.link}`);
		this._view.querySelector(".place-card__name").textContent = this.item.name;

		this._view.querySelector(".place-card__delete-icon").addEventListener('click', this.remove)
		this._view.querySelector(".place-card__like-icon").addEventListener('click', this.like)

  		return this._view
	}

}
