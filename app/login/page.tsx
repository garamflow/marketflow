import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";

const Login = () => {
	const handleFormSubmit = async (formData: FormData) => {
		"use server";
		await new Promise((resolve) => setTimeout(resolve, 5000));
	};

	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>로그인</h1>
				<h2 className='text-xl'>이메일로 로그인하기</h2>
			</div>
			<form
				action={handleFormSubmit}
				className='flex flex-col'
			>
				<FormInput
					type='email'
					placeholder='이메일'
					required
					name='email'
					errors={[]}
				/>
				<FormInput
					type='password'
					placeholder='비밀번호'
					required
					name='password'
					errors={[]}
				/>

				<FormButton text='로그인' />
			</form>
			<div className='divider' />
			<SocialLogin />
		</div>
	);
};

export default Login;
