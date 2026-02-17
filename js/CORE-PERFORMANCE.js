((w, d) => {
    'use strict';

    const C = { p: './js/', m: '200px', s: (navigator.connection?.saveData) };
    const M = new Map(); 
    const H = new WeakMap(); 
    
    const S = (t, p = 'user-visible') => {
        if ('scheduler' in w && w.scheduler.postTask) return w.scheduler.postTask(t, { priority: p });
        return (w.requestIdleCallback || (cb => setTimeout(cb, 0)))(t);
    };

    const L = (f) => {
        if (M.has(f) || C.s) return;
        M.set(f, 1);
        const l = d.createElement('link');
        Object.assign(l, { rel: 'modulepreload', href: C.p + f });
        d.head.append(l);
    };

    const X = async (el, f, n, e = null) => {
        if (H.has(el)) return; 
        
        if (e) {
            el.classList.add('js-loading');
            e.preventDefault?.(); 
        }

        try {
            await S(async () => {
                const m = await import(C.p + f);
                if (H.has(el)) return;
                
                H.set(el, 1); 
                if (e) el.classList.remove('js-loading');

                const args = el.dataset.props ? JSON.parse(el.dataset.props) : {};
                const fn = m[n] || w[n];
                
                if (typeof fn === 'function') fn(el, e, args);
            }, e ? 'user-blocking' : 'background');
        } catch (_) {
            if (e) el.classList.remove('js-loading');
        }
    };

    const I = (e) => {
        const el = e.target.closest('[data-hydrate]');
        if (!el || el.dataset.trigger !== 'interaction') return;
        
        const f = el.dataset.hydrate;

        if (e.type === 'mouseover' || e.type === 'touchstart' || e.type === 'focusin') {
            L(f);
        } else if (e.type === 'click') {
            X(el, f, el.dataset.fn, e);
        }
    };

    const O = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                O.unobserve(el);
                if (el.dataset.trigger === 'visible') {
                    L(el.dataset.hydrate);
                    X(el, el.dataset.hydrate, el.dataset.fn);
                }
            }
        });
    }, { rootMargin: C.m, threshold: 0.01 });

    const B = () => {
        d.querySelectorAll('[data-hydrate][data-trigger="visible"]').forEach(n => O.observe(n));
        ['mouseover', 'touchstart', 'focusin', 'click'].forEach(ev => 
            d.addEventListener(ev, I, { passive: ev !== 'click', capture: true })
        );
    };

    (d.readyState === 'loading') ? d.addEventListener('DOMContentLoaded', B) : B();

})(window, document);


((w, d) => {
    'use strict';

    // CONFIGURATION
    const CFG = {
        path: './js/',
        // Throttles resize checks to every 200ms to save CPU
        resizeDelay: 200 
    };

    const CACHE = new Map(); // Script Cache
    const OBSERVING = new Set(); // Active elements tracking

    // 1. FAST LOADER (Network)
    const load = (file) => {
        if (CACHE.has(file)) return CACHE.get(file);
        
        const p = new Promise((resolve) => {
            const s = d.createElement('script');
            s.type = 'module';
            s.src = CFG.path + file;
            s.async = true;
            s.onload = () => resolve();
            d.head.append(s);
        });

        CACHE.set(file, p);
        return p;
    };

    // 2. EXECUTOR (CPU)
    const run = async (el) => {
        const file = el.dataset.src;
        const fn = el.dataset.fn;
        
        // Unobserve immediately to prevent double-execution
        OBSERVER.unobserve(el);
        OBSERVING.delete(el);

        try {
            await load(file);
            const m = await import(CFG.path + file);
            if (m[fn]) m[fn](el);
            else if (w[fn]) w[fn](el);
        } catch (e) {
            console.error(e);
        }
    };

    // 3. THE "GATEKEEPER" CHECK
    // Returns TRUE only if media query matches
    const check = (el) => {
        const mq = el.dataset.media; // e.g., "(min-width: 1024px)"
        // If no media query exists, assume always true
        if (!mq) return true; 
        return w.matchMedia(mq).matches;
    };

    // 4. INTERSECTION OBSERVER
    const onIntersect = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // CRITICAL: The Double Gate
                if (check(el)) {
                    run(el); // Visible + Correct Screen Size = LOAD
                } else {
                    // Visible + WRONG Screen Size = WAIT
                    // We keep observing. If user rotates screen, we need to know.
                    OBSERVING.add(el); 
                }
            } else {
                // If it leaves viewport, stop tracking in the "Active Set"
                // to save resources during resize events.
                OBSERVING.delete(el);
            }
        });
    };

    const OBSERVER = new IntersectionObserver(onIntersect, { rootMargin: '100px' });

    // 5. RESIZE HANDLER (The "Force" Re-Check)
    // Only checks elements that are CURRENTLY visible but failed the media query previously.
    let timer;
    w.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (OBSERVING.size === 0) return; // CPU Saver: Do nothing if no candidates

            OBSERVING.forEach(el => {
                if (check(el)) run(el);
            });
        }, CFG.resizeDelay);
    }, { passive: true });

    // INIT
    const init = () => {
        const nodes = d.querySelectorAll('[data-src][data-media]');
        nodes.forEach(n => OBSERVER.observe(n));
    };

    (d.readyState === 'loading') ? d.addEventListener('DOMContentLoaded', init) : init();

})(window, document);