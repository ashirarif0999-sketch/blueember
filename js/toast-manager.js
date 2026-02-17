/**
 * ToastManager - Premium Toast Notification System
 */
const ToastManager = (() => {
    let container = null;

    function init() {
        if (!document.getElementById('toast-container')) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);

            // Inject Styles
            const style = document.createElement('style');
            style.textContent = `
                #toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 100000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    pointer-events: none;
                }
                
                .toast-notification {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-left: 4px solid #0099ff;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 320px;
                    transform: translateX(120%);
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    pointer-events: auto;
                    font-family: 'Space Grotesk', sans-serif;
                    overflow: hidden;
                    position: relative;
                }
                
                body.dark-mode .toast-notification {
                    background: rgba(40, 40, 40, 0.95);
                    color: white;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                }
                
                .toast-notification.show {
                    transform: translateX(0);
                }
                
                .toast-icon {
                    font-size: 20px;
                    color: #0099ff;
                }
                
                .toast-content {
                    flex: 1;
                }
                
                .toast-title {
                    font-weight: 700;
                    margin-bottom: 4px;
                    font-size: 14px;
                    color: #1e293b;
                }
                
                body.dark-mode .toast-title {
                    color: white;
                }
                
                .toast-message {
                    font-size: 12px;
                    color: #64748b;
                    line-height: 1.4;
                }
                
                body.dark-mode .toast-message {
                    color: #94a3b8;
                }
                
                .toast-close {
                    cursor: pointer;
                    color: #94a3b8;
                    transition: color 0.2s;
                }
                
                .toast-close:hover {
                    color: #1e293b;
                }
                
                /* Types */
                .toast-success { border-left-color: #22c55e; }
                .toast-success .toast-icon { color: #22c55e; }
                
                .toast-error { border-left-color: #ef4444; }
                .toast-error .toast-icon { color: #ef4444; }
                
                .toast-warning { border-left-color: #f59e0b; }
                .toast-warning .toast-icon { color: #f59e0b; }
                
                .toast-info { border-left-color: #0099ff; }
                .toast-info .toast-icon { color: #0099ff; }
                
                @media (max-width: 480px) {
                    #toast-container {
                        top: auto;
                        bottom: 20px;
                        right: 20px;
                        left: 20px;
                    }
                    .toast-notification {
                        width: auto;
                    }
                }
            `;
            document.head.appendChild(style);
        } else {
            container = document.getElementById('toast-container');
        }
    }

    function show(message, type = 'info', title = null) {
        if (!container) init();

        // Auto-title if null
        if (!title) {
            if (type === 'success') title = 'Success';
            else if (type === 'error') title = 'Error';
            else if (type === 'warning') title = 'Warning';
            else title = 'Notification';
        }

        // Icon Map
        const icons = {
            success: 'bx-check-circle',
            error: 'bx-x-circle',
            warning: 'bx-error',
            info: 'bx-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;

        toast.innerHTML = `
            <div class="toast-icon">
                <i class='bx ${icons[type] || icons.info}'></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-close" onclick="this.parentElement.remove()">
                <i class='bx bx-x'></i>
            </div>
        `;

        container.appendChild(toast);

        // Trigger Animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 5000);
    }

    return {
        init,
        show
    };
})();

// Expose Global
window.ToastManager = ToastManager;
window.showToast = ToastManager.show;

// Init on load
document.addEventListener('DOMContentLoaded', ToastManager.init);
