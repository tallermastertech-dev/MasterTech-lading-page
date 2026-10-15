// Utilidad para Notificaciones Web Push de Disponibilidad de Repuestos (Taller MasterTech)
// Permite que los usuarios soliciten alertas de repuestos agotados y reciban avisos del navegador al reponer stock.

export interface StockAlertItem {
  id: number;
  title: string;
  price: string;
  partNumber?: string;
  img?: string;
  subscribedAt: string;
}

const STORAGE_KEY = 'mastertech_stock_alerts';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Error solicitando permisos de notificacion:', err);
    return Notification.permission;
  }
}

export function getStockAlerts(): StockAlertItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

export function isProductSubscribed(id: number): boolean {
  const alerts = getStockAlerts();
  return alerts.some(item => Number(item.id) === Number(id));
}

export async function subscribeProductAlert(product: {
  id: number;
  title: string;
  price: string;
  partNumber?: string;
  img?: string;
}): Promise<{ success: boolean; status: NotificationPermission | 'unsupported' }> {
  const permission = await requestNotificationPermission();

  if (permission !== 'granted') {
    return { success: false, status: permission };
  }

  const alerts = getStockAlerts();
  const exists = alerts.some(item => Number(item.id) === Number(product.id));

  if (!exists) {
    const newItem: StockAlertItem = {
      id: Number(product.id),
      title: product.title,
      price: product.price || '',
      partNumber: product.partNumber || '',
      img: product.img || '',
      subscribedAt: new Date().toISOString()
    };
    alerts.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));

    // Notificacion de confirmacion de suscripcion inmediata
    await dispatchPushNotification('Alerta de Stock Activada - MasterTech', {
      body: `Te notificaremos en este navegador en cuanto tengamos disponible: ${product.title}.`,
      icon: '/logo.png',
      tag: `subscribed-${product.id}`,
      data: { url: '/catalogo' }
    });

    window.dispatchEvent(new CustomEvent('mastertech_stock_alerts_updated'));
  }

  return { success: true, status: 'granted' };
}

export function unsubscribeProductAlert(id: number): void {
  if (typeof window === 'undefined') return;
  const alerts = getStockAlerts().filter(item => Number(item.id) !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  window.dispatchEvent(new CustomEvent('mastertech_stock_alerts_updated'));
}

export async function dispatchPushNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  const defaultOptions: NotificationOptions = {
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [200, 100, 200] as any,
    ...options
  };

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, defaultOptions);
      return true;
    }
  } catch (swErr) {
    // Si falla el service worker, se envia directo con Notification API nativa
  }

  try {
    const notif = new Notification(title, defaultOptions);
    if (defaultOptions.data && (defaultOptions.data as any).url) {
      notif.onclick = () => {
        window.focus();
        window.location.href = (defaultOptions.data as any).url;
      };
    }
    return true;
  } catch (e) {
    console.warn('Error al emitir notificacion:', e);
    return false;
  }
}

// Verifica si algun repuesto suscrito paso a tener stock > 0 y emite la alerta
export async function checkAndTriggerStockAlerts(currentCatalog: any[]): Promise<StockAlertItem[]> {
  if (!Array.isArray(currentCatalog) || currentCatalog.length === 0) return [];
  const alerts = getStockAlerts();
  if (alerts.length === 0) return [];

  const remaining: StockAlertItem[] = [];
  const triggered: StockAlertItem[] = [];

  for (const alert of alerts) {
    const prod = currentCatalog.find(p => Number(p.id) === Number(alert.id));
    const stockQty = prod ? Number(prod.stock) : 0;

    if (prod && stockQty > 0) {
      triggered.push(alert);
      const unitsLabel = stockQty === 1 ? '1 unidad disponible' : `${stockQty} unidades disponibles`;
      
      await dispatchPushNotification('Repuesto Disponible en MasterTech', {
        body: `El repuesto "${alert.title}" ya ingreso a inventario (${unitsLabel}). Haz clic para apartarlo.`,
        icon: alert.img || '/logo.png',
        tag: `stock-available-${alert.id}`,
        data: {
          url: `/catalogo?q=${encodeURIComponent(alert.partNumber || alert.title)}`
        }
      });

      // Emite evento para que la interfaz muestre toast o aviso visual flotante
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mastertech_restocked_product_alert', {
          detail: { product: prod, alert }
        }));
      }
    } else {
      remaining.push(alert);
    }
  }

  if (triggered.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    window.dispatchEvent(new CustomEvent('mastertech_stock_alerts_updated'));
  }

  return triggered;
}
