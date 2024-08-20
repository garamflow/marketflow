"use client";
import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";
import { login } from "@/app/login/actions";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";

const Login = () => {
	const [state, dispatch] = useFormState(login, null);

	return (
		<div className='flex flex-col gap-10 py-8 px-5 min-h-screen'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>로그인</h1>
				<h2 className='text-xl'>이메일로 로그인하기</h2>
			</div>
			<form
				action={dispatch}
				className='flex flex-col'
			>
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
					minLength={PASSWORD_MIN_LENGTH}
					maxLength={PASSWORD_MAX_LENGTH}
					errors={state?.fieldErrors.password}
				/>

				<FormButton text='로그인' />
			</form>
			<div className='divider' />
			<SocialLogin />
		</div>
	);
};

export default Login;
