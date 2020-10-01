
import { Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges, HostListener } from '@angular/core';
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  @Input() searchedWord: string; // searchText
  @Input() content: string; // HTML content
  @Input() classToApply: string; //class to apply for highlighting
  @Input() setTitle = false; //sets title attribute of HTML
  @Input() highlightColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'title',
        this.content
      );
    }

    if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
      return;
    }

    this.renderer.setProperty(
      this.el.nativeElement,
      'innerHTML',
      this.getFormattedText()
    );
  }

  getFormattedText() {
    const re = new RegExp(`(${this.searchedWord})`, 'gi');

    return this.content.replace(re, `<span class="${this.classToApply}">$1</span>`);
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;

  }
  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('#faeebf');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.highlight(null);
  // }
}
