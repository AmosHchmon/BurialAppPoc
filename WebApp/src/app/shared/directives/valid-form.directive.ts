//https://netbasal.com/implementing-event-modifiers-in-angular-87e1a07969ce
import { Directive, Output, Renderer2, ElementRef, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
    selector: '[form.valid.event]',
    standalone: false
})
export class ValidFormDirective {
  @Output("form.valid.event") stopPropEvent = new EventEmitter();
  unsubscribe:any;

  constructor(private renderer: Renderer2, private element: ElementRef, private ngForm: NgForm) {
  }

  ngOnInit() {

    this.unsubscribe = this.renderer.listen(this.element.nativeElement, "click", event => {

      if (this.ngForm.valid) {
        this.stopPropEvent.emit(event);
      } else {
        event.stopPropagation();
      }

    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
