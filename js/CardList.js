class CardList {
	constructor(container){// принимает :		
		this.container = container;
	}

	addCard(item) {//принимает на вход экземпляр карточки
		this.container.appendChild(item);
		
	}

	/*
		Можно лучше: передавать newPlaceCard в конструктор класса, а не в render
	*/
	render(initialCards, newPlaceCard) {
		initialCards.forEach(item => {				
      		this.addCard(newPlaceCard(item));		      	
		})
	}
}