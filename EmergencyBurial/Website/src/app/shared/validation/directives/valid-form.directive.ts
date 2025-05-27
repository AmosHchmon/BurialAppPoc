//https://netbasal.com/implementing-event-modifiers-in-angular-87e1a07969ce
import { Directive, Output, Renderer2, ElementRef, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertType } from 'src/app/core/enums/alert.enum';
import { AlertService } from '../../services/alert.service';
import { DialogMessage } from '../../static/messages';

@Directive({
  selector: '[form.valid.event]'
})
export class ValidFormDirective {
  @Output("form.valid.event") stopPropEvent = new EventEmitter();
  unsubscribe:any;

  constructor(private renderer: Renderer2, private element: ElementRef, private alertService: AlertService, private ngForm: NgForm) {
  }

  ngOnInit() {

    this.unsubscribe = this.renderer.listen(this.element.nativeElement, "click", event => {

      if (this.ngForm.valid) {
        this.stopPropEvent.emit(event);
      } else {
        event.stopPropagation();
        this.alertService.alert(AlertType.Warning, { ClientMessage: DialogMessage.FormNotValid });
        let top = document.getElementById('topElement');
        if (top !== null) {
          top.scrollIntoView();
          top = null;
        }
      }

    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
