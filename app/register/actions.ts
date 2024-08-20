"use server";
import { EMAIL_TYPE_ERROR, INPUT_EMPTY_ERROR, PASSWORD_LENGTH_ERROR, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, PASSWORD_TYPE_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const checkUsername = (username: string) => !username.includes("#");
const checkPasswords = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;

const isUsernameAvailable = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});

	return !Boolean(user);
};

const isEmailAvailable = async (email: string) => {
	const userEmail = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});

	return !Boolean(userEmail);
};

const formSchema = z
	.object({
		username: z
			.string({ invalid_type_error: "한글 혹은 영어만 입력 가능합니다.", required_error: INPUT_EMPTY_ERROR })
			.trim()
			.toLowerCase()
			.refine(checkUsername, "특수문자는 입력 불가능합니다.")
			.refine(isUsernameAvailable, "해당 아이디는 이미 사용중입니다."),

		email: z.string({ invalid_type_error: EMAIL_TYPE_ERROR, required_error: INPUT_EMPTY_ERROR }).email({ message: EMAIL_TYPE_ERROR }).toLowerCase().refine(isEmailAvailable, "해당 이메일은 이미 존재합니다."),

		password: z.string({ invalid_type_error: PASSWORD_TYPE_ERROR, required_error: INPUT_EMPTY_ERROR }).min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR).max(PASSWORD_MAX_LENGTH, PASSWORD_LENGTH_ERROR).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),

		confirmPassword: z.string({ invalid_type_error: PASSWORD_TYPE_ERROR, required_error: INPUT_EMPTY_ERROR }).min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR).max(PASSWORD_MAX_LENGTH, PASSWORD_LENGTH_ERROR).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
	})
	.refine(checkPasswords, { message: "비밀번호가 동일하지 않습니다.", path: ["confirmPassword"] });

export const createAccount = async (prevState: any, formData: FormData) => {
	const data = { username: formData.get("username") as string | null, email: formData.get("email") as string | null, password: formData.get("password") as string | null, confirmPassword: formData.get("confirmPassword") as string | null };

	if (!data.username || !data.email || !data.password || !data.confirmPassword) error: "모든 필드를 채워주세요.";

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const hashedPassword = await bcrypt.hash(result.data.password, 12);

		const user = await db.user.create({
			data: {
				username: result.data.username,
				email: result.data.email,
				password: hashedPassword,
			},
			select: {
				id: true,
			},
		});

		const session = await getSession();
		session.id = user.id;
		await session.save();
		redirect("/profile");
	}
};
