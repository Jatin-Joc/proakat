// toast.component.ts
import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent{
  constructor(public toastService: ToastService) { }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
