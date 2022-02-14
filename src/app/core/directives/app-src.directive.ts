import { Attribute, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Directive({
  selector: 'img[appSrc]'
})
export class AppSrcDirective implements OnInit, OnDestroy {
  @Attribute('img-error') public imgError: string;
  @Input() appSrc: string;

  protected readonly nativeElement: HTMLElement;
  protected fullSrcPath: string;
  protected imgUrl: string = env.imgUrl;

  constructor(protected readonly renderer: Renderer2, protected readonly el: ElementRef) {
    this.nativeElement = this.el.nativeElement;
  }

  ngOnInit() {
    this.initAttribute();
  }

  ngOnDestroy() { }

  protected initAttribute() {
    this.nativeElement.onerror = () => this.onError();
    this.nativeElement.setAttribute('loading', 'auto');

    this.fullSrcPath = this.srcImage ? this.pathImage : './assets/images/not-found.jpg';
    this.nativeElement.setAttribute('src', this.fullSrcPath);
  }

  protected onError() {
    const fullImagePath = this.imgError || './assets/images/not-found.jpg';

    this.nativeElement.setAttribute('src', fullImagePath);
  }

  protected onLoad() {
    if (this.nativeElement.getAttribute('src') !== this.srcImage) {
      this.nativeElement.setAttribute('src', this.fullSrcPath);
    }
  }

  get pathImage(): string {
    return `${this.imgUrl}/${this.srcImage}/full/843,/0/default.jpg`;
  }

  get srcImage(): string {
    return this.appSrc;
  }
}
