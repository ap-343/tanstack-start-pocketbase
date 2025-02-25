import { createServerFn } from "@tanstack/start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/start/server";
import { pb } from "./pb";

export const logout = createServerFn().handler(() => {
	pb.authStore.clear();
	deleteCookie("pb_auth");
});

export const login = createServerFn()
	.validator((data: FormData) => {
		return {
			email: String(data.get("email") ?? ""),
			password: String(data.get("password") ?? ""),
		};
	})
	.handler(async ({ data: { email, password } }) => {
		const result = await pb
			.collection("users")
			.authWithPassword(email, password);
		setCookie("pb_auth", pb.authStore.exportToCookie());
		return result;
	});

export const authenticate = createServerFn().handler(async () => {
	// if client is not authenticated, try to authenticate with cookie
	if (!pb.authStore.isValid) {
		const cookie = getCookie("pb_auth");
		if (cookie) {
			pb.authStore.loadFromCookie(cookie);
		}
	}

	// if were authenticated, refresh the token
	if (pb.authStore.isValid) {
		await pb.collection("users").authRefresh();
	}

	// set the cookie in any case
	setCookie("pb_auth", pb.authStore.exportToCookie());

	// return the authenticated user
	return pb.authStore.record;
});
