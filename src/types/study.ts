import {Card} from "src/types/card";

export class Bucket {
  private readonly cards: Card[] = [];
  private nextCardIndex = 0;

  constructor() {}

  load(cards: Card[]) {
    this.clear();
    cards.forEach((card: Card) => {
      this.cards.push(card);
    });
  }

  nextCard(): Card | undefined {
    let card = this.cards[this.nextCardIndex];
    this.increaseNextCardIndex();
    return card;
  }

  increaseNextCardIndex() {

    if (this.nextCardIndex === this.cards.length - 1) {
      this.nextCardIndex = 0;
      console.log('Bucket.increaseNextCardIndex.If1');
    } else {
      this.nextCardIndex++;
      console.log('Bucket.increaseNextCardIndex.If2');
    }
    console.log('Bucket.increaseNextCardIndex.After', this.nextCardIndex);
  }

  decreaseNextCardIndex() {
    if (this.nextCardIndex === 0) {
      this.nextCardIndex = 0;
    } else {
      this.nextCardIndex--;
    }
  }

  removeCard(card: Card) {
    const index = this.cards.findIndex((c: Card) => c.id === card.id);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.decreaseNextCardIndex();
    }
  }

  clear() {
    this.cards.splice(0, this.cards.length);
    this.nextCardIndex = 0;
  }

  getCards() {
    return this.cards;
  }

  isEmpty() {
    console.log('Bucket.isEmpty', this.cards.length, this.cards.length === 0);
    return this.cards.length === 0;
  }

}
