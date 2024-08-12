"use server";
import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,16}$/);

const checkUsername = (username: string) => !username.includes("#");
const checkPasswords = ({ password, confirmPassword }: { password: string; confirmPassword: string }) => password === confirmPassword;

const formSchema = z
	.object({
		username: z
			.string({ invalid_type_error: "한글 혹은 영어만 입력 가능합니다.", required_error: "값이 비어있습니다." })
			.min(4, "사용자 이름은 4~10자로 입력해주세요.")
			.max(10, "사용자 이름은 4~10자로 입력해주세요.")
			.trim()
			.toLowerCase()
			.refine(checkUsername, "특수문자는 입력 불가능합니다."),
		email: z.string({ invalid_type_error: "이메일 형식을 올바르게 입력해주세요.", required_error: "값이 비어있습니다." }).toLowerCase().email({ message: "이메일 형식을 올바르게 입력해주세요." }),
		password: z
			.string({ invalid_type_error: "비밀번호 형식을 올바르게 입력해주세요.", required_error: "값이 비어있습니다." })
			.min(8, "비밀번호는 8~16자로 입력해주세요.")
			.max(16, "비밀번호는 8~16자로 입력해주세요.")
			.regex(passwordRegex, "비밀번호는 소문자, 대문자, 숫자, 특수문자를 최소 하나씩 포함해야합니다."),
		confirmPassword: z
			.string({ invalid_type_error: "비밀번호 형식을 올바르게 입력해주세요.", required_error: "값이 비어있습니다." })
			.min(8, "비밀번호는 8~16자로 입력해주세요.")
			.max(16, "비밀번호는 8~16자로 입력해주세요.")
			.regex(passwordRegex, "비밀번호는 소문자, 대문자, 숫자, 특수문자를 최소 하나씩 포함해야합니다."),
	})
	.refine(checkPasswords, { message: "비밀번호가 동일하지 않습니다.", path: ["confirmPassword"] });

export const createAccount = (prevState: any, formData: FormData) => {
	const data = { username: formData.get("username") as string | null, email: formData.get("email") as string | null, password: formData.get("password") as string | null, confirmPassword: formData.get("confirmPassword") as string | null };

	if (!data.username || !data.email || !data.password || !data.confirmPassword) error: "모든 필드를 채워주세요.";

	const result = formSchema.safeParse(data);

	if (!result.success) {
		console.log(result.error.flatten());
		return result.error.flatten();
	}
};
