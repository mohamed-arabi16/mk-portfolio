import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

// Define the LayoutShift interface based on the Performance API
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
interface PerformanceObserverComponentProps {
  children: React.ReactNode;
}

export function PerformanceObserver({ children }: PerformanceObserverComponentProps) {
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new window.PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              analytics.event('web_vital', 'Performance', 'LCP', Math.round(entry.startTime));
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new window.PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const fidEntry = entry as PerformanceEventTiming;
              analytics.event('web_vital', 'Performance', 'FID', Math.round(fidEntry.processingStart - fidEntry.startTime));
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new window.PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const clsEntry = entry as LayoutShift;
              if (!clsEntry.hadRecentInput) {
                clsValue += clsEntry.value;
              }
            }
            analytics.event('web_vital', 'Performance', 'CLS', Math.round(clsValue * 1000));
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('Performance tracking failed:', error);
        }
      }
    };

    // Track page load time
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        try {
          const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
          analytics.event('page_load_time', 'Performance', 'Load Time', Math.round(loadTime));
        } catch (error) {
          console.warn('Page load tracking failed:', error);
        }
      });
    };

    // Track errors
    const trackErrors = () => {
      window.addEventListener('error', (event) => {
        analytics.event('javascript_error', 'Error', event.error?.message || 'Unknown error');
      });

      window.addEventListener('unhandledrejection', (event) => {
        analytics.event('promise_rejection', 'Error', event.reason?.toString() || 'Unknown rejection');
      });
    };

    if (typeof window !== 'undefined') {
      trackWebVitals();
      trackPageLoad();
      trackErrors();
    }
  }, []);

  return <>{children}</>;
}