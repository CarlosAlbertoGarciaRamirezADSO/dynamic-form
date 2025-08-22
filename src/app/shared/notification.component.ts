import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="notification-wrapper" aria-live="polite" aria-atomic="true">
      <div *ngFor="let n of notifSvc.notifications$ | async" class="notification toast-{{n.type}}" role="status">
        <div class="notif-left" [attr.aria-hidden]="true">
          <span class="notif-icon">{{ n.type === 'success' ? '✓' : n.type === 'error' ? '✖' : 'ℹ' }}</span>
        </div>
        <div class="notif-body">
          <div class="notif-title">{{ n.type === 'success' ? 'Éxito' : n.type === 'error' ? 'Error' : 'Información' }}</div>
          <div class="notif-message">{{ n.message }}</div>
        </div>
        <button class="notification-close" (click)="notifSvc.remove(n.id)" aria-label="Cerrar notificación">×</button>
      </div>
    </div>
  `,
  styles: [
    `:host { position: fixed; top: 18px; right: 18px; z-index: 1200; font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
     .notification-wrapper { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
     .notification { display: flex; align-items: center; gap: 12px; min-width: 280px; max-width: 420px; background: #ffffff; color: #1f2937; padding: 12px 12px; border-radius: 10px; box-shadow: 0 8px 24px rgba(15,23,42,0.12); border-left: 6px solid transparent; transform: translateY(-6px); opacity: 0; animation: slideIn 240ms ease forwards; }
     .notification .notif-left { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(0,0,0,0.04); flex: 0 0 36px; }
     .notif-icon { font-weight: 700; font-size: 14px; }
     .notif-body { display: flex; flex-direction: column; gap: 2px; }
     .notif-title { font-size: 13px; font-weight: 600; color: #111827; }
     .notif-message { font-size: 13px; color: #374151; }
     .notification-close { margin-left: 8px; background: transparent; border: none; color: #6b7280; font-size: 18px; cursor: pointer; padding: 6px; border-radius: 6px; }
     .notification-close:hover { background: rgba(0,0,0,0.03); }

     /* Colored accents */
     .toast-success { border-left-color: #16a34a; }
     .toast-error { border-left-color: #dc2626; }
     .toast-info { border-left-color: #0ea5ad; }

     @keyframes slideIn { from { transform: translateY(-6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `
  ]
})
export class NotificationComponent {
  constructor(public notifSvc: NotificationService) {}
}
