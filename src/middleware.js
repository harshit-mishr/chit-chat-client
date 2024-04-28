// middleware.js

import { NextResponse, NextRequest } from "next/server";

// This is a placeholder function. Replace it with your actual implementation.
function isUserAuthenticated() {
	// Check if the user is authenticated
	// Return true if authenticated, false otherwise
	return false;
}

const BASE_URL =
	process.env.NODE_ENV === "production"
		? "https://your-production-url.com" //futre domain
		: "http://localhost:3000";

export function middleware(request) {
	console.log("Middleware executed...");

	// Redirect to /auth/login when path is /
	if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(`${BASE_URL}/auth/login`); //will uncomment in future
	}

	// Log when path is /home
	if (request.nextUrl.pathname === "/home") {
		console.log("Path home is view");
	}

	// Protect /dashboard and /home if user is not authenticated
	if (
		(request.nextUrl.pathname === "/dashboard" ||
			request.nextUrl.pathname === "/home") &&
		!isUserAuthenticated()
	) {
		return NextResponse.redirect(`${BASE_URL}/auth/login`);
	}

	// Continue request chain for other paths
	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/home", "/dashboard"],
};
