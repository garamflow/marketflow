"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
	.string()
	.trim()
	.refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "전화번호를 알맞게 입력해주세요.");

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
	token: boolean;
}

export const smsLogin = (prevState: ActionState, formData: FormData) => {
	const phone = formData.get("phone");
	const token = formData.get("token");

	if (!prevState.token) {
		const result = phoneSchema.safeParse(phone);

		if (!result.success) {
			return {
				token: false,
				errors: result.error.flatten(),
			};
		} else {
			return {
				token: true,
			};
		}
	} else {
		const result = tokenSchema.safeParse(token);
		if (!result.success) {
			return {
				token: true,
				errors: result.error.flatten(),
			};
		} else {
			redirect("/");
		}
	}
};
