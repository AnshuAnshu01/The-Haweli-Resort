import { useEffect } from 'react';

/**
 * useSmoothScroll
 * Replaces the browser's default choppy wheel scroll with a silky,
 * momentum-based custom scroll using requestAnimationFrame.
 *
 * Characteristics:
 *  - Ease-out cubic deceleration (feels buttery)
 *  - Accumulates wheel deltas so fast scrolling is responsive
 *  - Respects reduced-motion preference
 *  - Automatically cleans up on unmount
 */
export function useSmoothScroll() {
    useEffect(() => {
        // Respect user's OS accessibility preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const EASE = 0.072;          // lower = smoother/slower, higher = snappier
        const MULTIPLIER = 1.2;      // wheel delta amplification (feel control)

        let target = window.scrollY;
        let current = window.scrollY;
        let rafId: number | null = null;
        let isScrolling = false;

        function tick() {
            const diff = target - current;

            // Stop animating once close enough (sub-pixel)
            if (Math.abs(diff) < 0.5) {
                current = target;
                window.scrollTo(0, current);
                isScrolling = false;
                rafId = null;
                return;
            }

            current += diff * EASE;
            window.scrollTo(0, current);
            rafId = requestAnimationFrame(tick);
        }

        function onWheel(e: WheelEvent) {
            // Only intercept vertical wheel on the main document scroll
            if (e.ctrlKey) return;           // allow pinch-zoom / ctrl+scroll
            if (e.target instanceof Element) {
                // Don't intercept elements that have their own scrollable overflow
                let el: Element | null = e.target as Element;
                while (el && el !== document.documentElement) {
                    const style = getComputedStyle(el);
                    const overflow = style.overflowY;
                    const isScrollable = overflow === 'auto' || overflow === 'scroll';
                    if (isScrollable && el.scrollHeight > el.clientHeight) return;
                    el = el.parentElement;
                }
            }

            e.preventDefault();

            const delta = normalizeDelta(e) * MULTIPLIER;
            target = Math.max(0, Math.min(
                target + delta,
                document.documentElement.scrollHeight - window.innerHeight
            ));

            if (!isScrolling) {
                isScrolling = true;
                current = window.scrollY;
                rafId = requestAnimationFrame(tick);
            }
        }

        /**
         * Normalize wheel delta across browsers / devices.
         * Most mice emit deltaMode=0 (pixels), trackpads often emit
         * deltaMode=0 with smaller values. We normalise to a consistent unit.
         */
        function normalizeDelta(e: WheelEvent): number {
            let dy = e.deltaY;
            if (e.deltaMode === 1) dy *= 32;   // line mode → pixels
            if (e.deltaMode === 2) dy *= window.innerHeight; // page mode
            return dy;
        }

        window.addEventListener('wheel', onWheel, { passive: false });

        // Sync target if user uses keyboard / scrollbar / touch
        function onScroll() {
            if (!isScrolling) {
                target = window.scrollY;
                current = window.scrollY;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);
}
