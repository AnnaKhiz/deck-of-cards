const cardSuits = [
	{ name: 'Hearts', icon: '♥️' },
	{ name: 'Diamonds', icon: '♦️' },
	{ name: 'Clubs', icon: '♣️' },
	{ name: 'Spades', icon: '♠️' }
];

const cardsRanks = [
	{ name: '2', icon: '2️⃣' },
	{ name: '3', icon: '3️⃣' },
	{ name: '4', icon: '4️⃣' },
	{ name: '5', icon: '5️⃣' },
	{ name: '6', icon: '6️⃣' },
	{ name: '7', icon: '7️⃣' },
	{ name: '8', icon: '8️⃣' },
	{ name: '9', icon: '9️⃣' },
	{ name: '10', icon: '🔟' },
	{ name: 'J', icon: '🤴' },
	{ name: 'Q', icon: '👸' },
	{ name: 'K', icon: '🤴' },
	{ name: 'A', icon: '🅰️' }
];

const deck = document.getElementById('deck');
const card = document.getElementById('card');
const shuffleButton = document.getElementById('shuffle');

let deckOfCards = [];
let shuffledDeck = [];

cardSuits.forEach(suit => {
	cardsRanks.forEach(rank => {
		deckOfCards.push({
			id: deckOfCards.length + 1,
			rank: rank.icon,
			suit: suit.icon,
			value: rank.name === 'J' || rank.name === 'Q' || rank.name === 'K' ? 10 : rank.name === 'A' ? 11 : parseInt(rank.name)
		});
	});
});

shuffleButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (!deckOfCards.length) {
		deck.innerText = 'Deck is empty';
		return;
	}

	shuffleDeck();
})

function renderDeck(deckArray) {
	deck.insertAdjacentHTML('beforeend', `
	${deckArray.map(card => `
		<div class="${card.suit === '♣️' || card.suit === '♠️' ? 'black' : 'red'}">
			<p>${card.rank} <span>${card.suit}</span></p>
		</div>
	`).join(' ')}
`)
}

renderDeck(deckOfCards);

function shuffleDeck() {
	let index;

	do {
		index = Math.floor(Math.random() * deckOfCards.length);
		const elem = deckOfCards.find(el => el.id === deckOfCards[index].id);
		const shuffledElemIndex = shuffledDeck.findIndex(el => el.id === elem.id);
		if (shuffledElemIndex !== -1) return;

		shuffledDeck.push(elem);
		deckOfCards.splice(index, 1);

	} while (deckOfCards.length)

	deck.innerText = '';
	card.innerText = '';

	card.insertAdjacentHTML('beforeend', `
		<div class="${shuffledDeck[0].suit === '♣️' || shuffledDeck[0].suit === '♠️' ? 'black' : 'red'} card">
			<p>${shuffledDeck[0].rank} <span>${shuffledDeck[0].suit}</span></p>
		</div>
	`)

	shuffledDeck.splice(0,1);

	renderDeck(shuffledDeck);

	deckOfCards = shuffledDeck;
	shuffledDeck = [];
}



