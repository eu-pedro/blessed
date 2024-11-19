import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename); 

export class VerseRepository {
  private static versesPath = path.join(__dirname, '../../../infra/data/verses.json');
  private static controlPath = path.join(__dirname, '../../../infra/data/verse-control.json');

  public static loadVerses() {
    const versesJson = fs.readFileSync(this.versesPath, 'utf-8');
    return JSON.parse(versesJson).Salmos;
  }

  public static loadControl() {
    try {
      const controlJson = fs.readFileSync(this.controlPath, 'utf-8');
      return JSON.parse(controlJson);
    } catch (error) {
      return { lastSentIndex: -1 };
    }
  }

  public static saveControl(index: number) {
    const control = { lastSentIndex: index };
    fs.writeFileSync(this.controlPath, JSON.stringify(control, null, 2));
  }
}
