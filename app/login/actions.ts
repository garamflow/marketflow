"use server";

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const isEmailExists = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});

	return Boolean(user);
};

const formSchema = z.object({
	email: z.string().email().toLowerCase().refine(isEmailExists, "이메일이 존재하지 않습니다."),
	password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			},
		});

		const comparePassword = await bcrypt.compare(result.data.password, user!.password ?? "");

		if (comparePassword) {
			const session = await getSession();
			session.id = user!.id;
			await session.save();
			redirect("/profile");
		} else {
			return {
				fieldErrors: {
					password: ["잘못된 비밀번호입니다."],
					email: [],
				},
			};
		}
	}
};
