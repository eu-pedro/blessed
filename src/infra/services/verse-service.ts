import verses  from '../data/verses.json'

export class VerseService {
  private verses = verses; 
  public loadVerses() {
    return this.verses.Salmos;
  }
}

export const verseService = new VerseService()
