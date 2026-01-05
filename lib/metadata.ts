import { VisitorMetadata } from '@/types';

/**
 * Captures visitor metadata including IP, location, device info
 */
export const captureVisitorMetadata = async (): Promise<VisitorMetadata> => {
  const metadata: VisitorMetadata = {
    user_agent: navigator.userAgent,
    browser: detectBrowser(),
    device: detectDevice(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    submission_date: new Date().toISOString().split('T')[0],
    submission_time: new Date().toTimeString().split(' ')[0],
  };

  // Fetch IP and location data
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      metadata.ip_address = data.ip;
      metadata.country = data.country_name;
      metadata.city = data.city;
      metadata.region = data.region;
    }
  } catch (error) {
    console.log('Could not fetch location data:', error);
    // Fallback: try alternative service
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (response.ok) {
        const data = await response.json();
        metadata.ip_address = data.ip;
      }
    } catch (err) {
      console.log('Could not fetch IP:', err);
    }
  }

  return metadata;
};

/**
 * Detects browser name from user agent
 */
function detectBrowser(): string {
  const ua = navigator.userAgent;
  
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  
  return 'Unknown';
}

/**
 * Detects device type
 */
function detectDevice(): string {
  const ua = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

/**
 * Format metadata for display
 */
export const formatMetadata = (metadata: VisitorMetadata): string => {
  const parts: string[] = [];
  
  if (metadata.city && metadata.country) {
    parts.push(`${metadata.city}, ${metadata.country}`);
  } else if (metadata.country) {
    parts.push(metadata.country);
  }
  
  if (metadata.browser) {
    parts.push(metadata.browser);
  }
  
  if (metadata.device) {
    parts.push(metadata.device);
  }
  
  return parts.join(' • ');
};

