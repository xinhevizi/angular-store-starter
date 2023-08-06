import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Notify } from '../models/notify';

@Injectable()
export class HelpersService {
  constructor(private toastr: ToastrService) {}

  show(notify: Notify) {
    switch (notify.type.toLowerCase()) {
      case 'success':
        this.toastr.success(notify.type, notify.title);
        break;
      case 'error':
        this.toastr.error(notify.type, notify.title);
        break;
      case 'info':
        this.toastr.info(notify.type, notify.title);
        break;
      case 'warning':
        this.toastr.warning(notify.type, notify.title);
        break;
      default:
        break;
    }
  }
}
