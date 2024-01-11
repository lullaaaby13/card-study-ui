import {WordCard} from "src/types/word-card";

export class Bucket {
  private readonly cards: WordCard[] = [];
  private nextCardIndex = 0;

  constructor() {}

  load(cards: WordCard[]) {
    this.clear();
    cards.forEach((card: WordCard) => {
      this.cards.push(card);
    });
  }

  nextCard(): WordCard | undefined {
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

  removeCard(card: WordCard) {
    const index = this.cards.findIndex((c: WordCard) => c.id === card.id);
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
