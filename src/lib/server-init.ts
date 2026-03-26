/**
 * Initialize server-side services
 * This file should be imported in the root layout or app initialization
 */

import { initYoutubeCron } from './youtube-cron';

/**
 * Initialize all background jobs and services
 * Call this in your root layout or server component
 */
export async function initializeServer() {
    // Only initialize cron on server-side and not in static generation
    if (typeof window === 'undefined') {
        try {
            initYoutubeCron();
        } catch (error) {
            console.error('Failed to initialize server services:', error);
        }
    }
}
