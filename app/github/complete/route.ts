import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");

	if (!code) {
		return notFound();
	}

	if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
		console.error("GitHub OAuth 환경 변수가 설정되지 않았습니다.");
		return new NextResponse("Server configuration error", { status: 500 });
	}

	const accessTokenURL = "https://github.com/login/oauth/access_token";
	const accessTokenParams = new URLSearchParams({
		client_id: process.env.GITHUB_CLIENT_ID!,
		client_secret: process.env.GITHUB_CLIENT_SECRET!,
		code,
	});

	try {
		const accessTokenResponse = await fetch(accessTokenURL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: accessTokenParams.toString(),
		});

		if (!accessTokenResponse.ok) {
			throw new Error("Failed to fetch access token");
		}

		const { error, access_token } = await accessTokenResponse.json();

		if (error) {
			throw new Error(error || "Error obtaining access token");
		}

		const userProfileResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-cache",
		});

		if (!userProfileResponse.ok) {
			throw new Error("Failed to fetch user profile");
		}

		const { id, avatar_url, login } = await userProfileResponse.json();
		const user = await db.user.findUnique({
			where: {
				github_id: id + "",
			},
			select: {
				id: true,
			},
		});

		const session = await getSession();

		if (user) {
			session.id = user.id;
		} else {
			const newUser = await db.user.create({
				data: {
					username: login,
					github_id: id + "",
					avatar: avatar_url,
				},
				select: {
					id: true,
				},
			});
			const session = await getSession();
			session.id = newUser.id;
		}

		await session.save();
		return NextResponse.redirect("/profile");
	} catch (error) {
		console.error("Error during OAuth process:", error);
		return new NextResponse(null, { status: 500 });
	}
}
