// middleware.js

import { NextResponse, NextRequest } from 'next/server';

// This is a placeholder function. Replace it with your actual implementation.
function isUserAuthenticated() {
    // Check if the user is authenticated
    // Return true if authenticated, false otherwise
    return false;
}

const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'http://chit-chat-client-fawn.vercel.app/' //vercel for now
        : 'http://localhost:3000';

export function middleware(request) {
    console.log('Middleware executed...');

    // List of your application's routes
    const routes = ['/messages', '/notifications', '/user-settings/undefined'];

    // Redirect to /auth/login when path is /
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(`${BASE_URL}/auth/login`); //will uncomment in future
    }

    // Log and set JWT when path is /home and token exists in headers
    if (request.nextUrl.pathname === '/home') {
        console.log('User is authenticated');
        return NextResponse.next();
    }

    // Check if the request URL matches any of your application's routes
    if (routes.includes(request.nextUrl.pathname)) {
        console.log('Not found');
        // If it doesn't, redirect to the 'coming-soon' page
        return NextResponse.redirect(`${BASE_URL}/coming-soon`);
    }

    // Protect /dashboard and /home if user is not authenticated
    if (
        (request.nextUrl.pathname === '/dashboard' ||
            request.nextUrl.pathname === '/home') &&
        !isUserAuthenticated()
    ) {
        return NextResponse.redirect(`${BASE_URL}/auth/login`);
    }

    // Continue request chain for other paths
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/home',
        '/dashboard',
        '/messages',
        '/notifications',
        '/profile',
        '/user-settings/undefined',
    ],
};
