import React from "react";
export function computeScrollState(el: HTMLDivElement): {
  canScrollLeft: boolean;
  canScrollRight: boolean;
} {
  const hasOverflow = el.scrollWidth > el.clientWidth;
  const canScrollLeft = hasOverflow && el.scrollLeft > 0;
  const canScrollRight =
    hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  return { canScrollLeft, canScrollRight };
}

export function getScrollAmount(containerWidth: number): number {
  const min = 200;
  const proportion = Math.floor(containerWidth * 0.8);
  return Math.max(min, proportion);
}

export function useHorizontalScrollArrows() {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const scrollEndTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const state = computeScrollState(el);
      setCanScrollLeft(state.canScrollLeft);
      setCanScrollRight(state.canScrollRight);
    };

    update();
    const onScroll = () => {
      setIsScrolling(true);
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        update();
      }, 200);
      update();
    };
    const onResize = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onResize as any);
      ro.disconnect();
      if (scrollEndTimerRef.current) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    const el = wrapperRef.current;
    if (!el) return;
    const amount = getScrollAmount(el.clientWidth);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const showLeftArrow = !isScrolling && canScrollLeft;
  const showRightArrow = !isScrolling && canScrollRight;
  return { wrapperRef, canScrollLeft, canScrollRight, showLeftArrow, showRightArrow, isScrolling, scrollBy };
}

export function useFadePresence(targetVisible: boolean, durationMs = 180) {
  const [present, setPresent] = React.useState<boolean>(targetVisible);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeoutId: number | null = null;
    let rafId: number | null = null;
    if (targetVisible) {
      setPresent(true);
      rafId = window.requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
      timeoutId = window.setTimeout(() => {
        setPresent(false);
      }, durationMs);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [targetVisible, durationMs]);

  return { present, visible };
}


