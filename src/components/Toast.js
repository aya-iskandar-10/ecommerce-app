import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

export function Toast() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          role="alert"
        >
          <div className="toast__content">
            {toast.type === 'error' && <span className="toast__icon">✕</span>}
            {toast.type === 'success' && <span className="toast__icon">✓</span>}
            <span className="toast__message">{toast.message}</span>
            {toast.action && <Link className="toast__action" to={toast.action.to} onClick={() => removeToast(toast.id)}>{toast.action.label}</Link>}
          </div>
          <button
            className="toast__close"
            onClick={() => removeToast(toast.id)}
            type="button"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
