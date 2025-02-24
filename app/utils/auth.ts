import { createServerFn } from "@tanstack/start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/start/server";
import type { AuthRecord } from "pocketbase";
import { pb } from "./pb";

export const logout = createServerFn().handler(() => {
	pb.authStore.clear();
	deleteCookie("pb_auth");
});

export const login = createServerFn()
	.validator((data: FormData) => ({
		email: String(data.get("email") ?? ""),
		password: String(data.get("password") ?? ""),
	}))
	.handler(
		async ({
			data: { email, password },
		}: { data: { email: string; password: string } }) => {
			await pb.collection("users").authWithPassword(email, password);
			setCookie("pb_auth", pb.authStore.exportToCookie());
		},
	);

export const authenticate = createServerFn().handler(
	async (): Promise<AuthRecord | null> => {
		// if client is not authenticated, load the cookie
		if (!pb.authStore.isValid) {
			const cookie = getCookie("pb_auth");
			if (cookie) {
				pb.authStore.loadFromCookie(cookie);
			}
		}

		// if the user is authenticated, refresh the token
		if (pb.authStore.isValid) {
			await pb.collection("users").authRefresh();
		}

		// set the cookie
		setCookie("pb_auth", pb.authStore.exportToCookie());

		// return the user
		return pb.authStore.record;
	},
);
