import * as Amplitude from 'expo-analytics-amplitude';
import { normalizeTrackingOptions } from './analyticsUtils';
import getEnvVars from '../../environment';
const { AMPLITUDE_API_KEY } = getEnvVars()


let isInitialized = false;

export const events = {
    USER_LOGGED_IN: 'USER_LOGGED_IN',
    USER_LOGGED_OUT: 'USER_LOGGED_OUT',
    USER_CREATED_ACCOUNT: 'USER_CREATED_ACCOUNT',
    // USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',
    // USER_LINKED_SOCIAL: 'USER_LINKED_SOCIAL',
    // USER_UPDATED_EMAIL: 'USER_UPDATED_EMAIL',
    // USER_UPDATED_PROFILE: 'USER_UPDATED_PROFILE',
    // USER_UPDATED_LINKS: 'USER_UPDATED_SOCIAL_LINKS',
    // USER_UPDATED_LIKE: 'USER_UPDATED_LIKE',
    // USER_UPDATED_PRIVACY: 'USER_UPDATED_PRIVACY',
    // USER_REMOVED_PROJECT: 'USER_REMOVED_PROJECT',
    // USER_OPENED_CREATION: 'USER_OPENED_CREATION',
    // USER_UPDATED_SETTINGS: 'USER_UPDATED_SETTINGS',
    USER_PLACED_ORDER: 'USER_PLACED_ORDER'
};



export function initialize() {
    if (isInitialized || !AMPLITUDE_API_KEY) {
        // console.log(isInitialized, !Environment.isProduction, !AMPLITUDE_API_KEY)
        return;
    }
    Amplitude.initialize(AMPLITUDE_API_KEY);
    isInitialized = true;
}

export function identify(id, options) {
    initialize();
    const properties = normalizeTrackingOptions(options);

    if (id) {
        Amplitude.setUserId(id);
        if (properties) {
            Amplitude.setUserProperties(properties);
        }
    } else {
        Amplitude.clearUserProperties();
    }
}

export function track(event, options) {
    initialize();
    const properties = normalizeTrackingOptions(options);

    if (properties) {
        Amplitude.logEventWithProperties(event, properties);
    } else {
        Amplitude.logEvent(event);
    }
}

export default {
    events,
    initialize,
    identify,
    track,
};