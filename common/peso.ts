export class Media {
    media: String = '';
  
    copyFrom(from: Media): void {
      this.media = from.media;
    }
  }
  