import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timeout?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private idCounter = 0;

  private get current() {
    return this.notificationsSubject.value;
  }

  private push(notification: Notification) {
    this.notificationsSubject.next([...this.current, notification]);
    if (notification.timeout && notification.timeout > 0) {
      setTimeout(() => this.remove(notification.id), notification.timeout);
    }
  }

  showSuccess(message: string, timeout = 4000) {
    this.push({ id: ++this.idCounter, type: 'success', message, timeout });
  }

  showError(message: string, timeout = 6000) {
    this.push({ id: ++this.idCounter, type: 'error', message, timeout });
  }

  showInfo(message: string, timeout = 4000) {
    this.push({ id: ++this.idCounter, type: 'info', message, timeout });
  }

  remove(id: number) {
    this.notificationsSubject.next(this.current.filter(n => n.id !== id));
  }

  clear() {
    this.notificationsSubject.next([]);
  }
}
