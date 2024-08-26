export async function GET() {
	const baseURL = "https://github.com/login/oauth/authorize";
	const params = { client_id: process.env.GITHUB_CLIENT_ID!, scope: "read:user, user:email", allow_sigup: "true" };
	const formattedParams = new URLSearchParams(params);

	return Response.redirect(`${baseURL}?${formattedParams}`);
}
