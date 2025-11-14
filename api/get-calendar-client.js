
import { google } from 'googleapis';

export async function getCalendarClient() {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const calendarId = process.env.CALENDAR_ID;
    
    if (!serviceAccountEmail || !privateKey || !calendarId) {
        throw new Error('Google Calendar service account credentials not configured');
    }
    
    try {
        const auth = new google.auth.JWT(
            serviceAccountEmail,
            undefined,
            privateKey,
            ['https://www.googleapis.com/auth/calendar'],
            undefined
        );
        
        return {
            calendar: google.calendar({ version: 'v3', auth }),
            calendarId: calendarId
        };
    } catch (error) {
        console.error('Error creating Google Calendar client:', error);
        throw new Error('Failed to initialize Google Calendar client');
    }
}
