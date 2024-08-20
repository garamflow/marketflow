"use client";
import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";
import { createAccount } from "@/app/register/actions";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";

const Register = () => {
	const [state, dispatch] = useFormState(createAccount, null);

	return (
		<div className='flex flex-col gap-10 py-8 px-5 min-h-screen'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>환영합니다!</h1>
				<h2 className='text-xl'>아래 빈 칸들을 모두 채워주세요.</h2>
			</div>
			<form
				action={dispatch}
				className='flex flex-col gap-3'
			>
				<FormInput
					type='text'
					placeholder='사용자 이름'
					required
					name='username'
					errors={state?.fieldErrors.username}
				/>
				<FormInput
					type='email'
					placeholder='이메일'
					required
					name='email'
					errors={state?.fieldErrors.email}
				/>
				<FormInput
					type='password'
					placeholder='비밀번호'
					required
					name='password'
					errors={state?.fieldErrors.password}
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
				/>
				<FormInput
					type='password'
					placeholder='비밀번호 확인하기'
					required
					name='confirmPassword'
					errors={state?.fieldErrors.confirmPassword}
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
				/>
				<FormButton
					className='lg:btn-md'
					text='계정 생성하기'
				/>
			</form>
			<div className='divider' />
			<SocialLogin />
		</div>
	);
};

export default Register;
