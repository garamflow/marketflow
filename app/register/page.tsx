import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import SocialLogin from "@/app/components/SocialLogin";

const Register = () => {
	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>환영합니다!</h1>
				<h2 className='text-xl'>아래 빈 칸들을 모두 채워주세요.</h2>
			</div>
			<form className='flex flex-col gap-3'>
				<FormInput
					type='text'
					placeholder='사용자 이름'
					required
					name='username'
					errors={["사용자 이름이 너무 짧습니다."]}
				/>
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
				<FormInput
					type='password'
					placeholder='비밀번호 확인하기'
					required
					name='checkPassword'
					errors={[]}
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
