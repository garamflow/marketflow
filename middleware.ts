import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
	[key: string]: boolean;
}

const publicOnlyUrls: Routes = {
	"/": true,
	"/login": true,
	"/sms": true,
	"/register": true,
	"/github/login": true,
	"/github/complete": true,
};

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const isPublicRoute = publicOnlyUrls[request.nextUrl.pathname];

	if (!session.id && !isPublicRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (session.id && !!isPublicRoute) {
		return NextResponse.redirect(new URL("/home", request.url));
	}
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
