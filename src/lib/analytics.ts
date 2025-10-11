import ReactGA from 'react-ga4';

// Configuration
const TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual Google Analytics 4 ID
const isProduction = import.meta.env.MODE === 'production';

export const analytics = {
  // Initialize Google Analytics
  init: () => {
    if (isProduction && TRACKING_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(TRACKING_ID, {
        gtagOptions: {
          debug_mode: !isProduction,
        },
      });
    }
  },

  // Track page views
  pageview: (path: string, title?: string) => {
    if (isProduction) {
      ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title || document.title,
      });
    }
  },

  // Track events
  event: (action: string, category: string = 'User Interaction', label?: string, value?: number) => {
    if (isProduction) {
      ReactGA.event({
        action,
        category,
        label,
        value,
      });
    }
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, section?: string) => {
    analytics.event('click', 'Button', `${section ? section + ' - ' : ''}${buttonName}`);
  },

  // Track form submissions
  trackFormSubmission: (formName: string, success: boolean = true) => {
    analytics.event(success ? 'form_submit_success' : 'form_submit_error', 'Form', formName);
  },

  // Track content engagement
  trackContentView: (contentId: string, contentType: string) => {
    analytics.event('content_view', 'Content', `${contentType}-${contentId}`);
  },

  // Track navigation
  trackNavigation: (destination: string) => {
    analytics.event('navigate', 'Navigation', destination);
  },

  // Track external link clicks
  trackExternalLink: (url: string, linkText?: string) => {
    analytics.event('external_link_click', 'Outbound Link', linkText || url);
  },

  // Track case study views
  trackCaseStudyView: (caseStudyId: string) => {
    analytics.event('case_study_view', 'Case Study', caseStudyId);
  },

  // Track service inquiries
  trackServiceInquiry: (service: string) => {
    analytics.event('service_inquiry', 'Services', service);
  }
};

// Hook for tracking user interactions
export const useAnalytics = () => {
  return analytics;
};