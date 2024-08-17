"use client";
import FormButton from "@/app/components/FormButton";
import FormInput from "@/app/components/FormInput";
import { smsLogin } from "@/app/sms/actions";
import { useFormState } from "react-dom";

const initialState = {
	token: false,
	error: undefined,
};

const SMSLogin = () => {
	const [state, dispatch] = useFormState(smsLogin, initialState);

	return (
		<div className='flex flex-col gap-10 py-8 px-5'>
			<div className='flex flex-col gap-2 *:font-medium'>
				<h1 className='text-2xl'>SMS</h1>
				<h2 className='text-xl'>SMS로 로그인하기</h2>
			</div>
			<form
				action={dispatch}
				className='flex flex-col'
			>
				{state.token ? (
					<FormInput
						type='number'
						placeholder='알맞은 코드를 입력해주세요.'
						required
						name='token'
						min={100000}
						max={999999}
						errors={state.errors?.formErrors}
					/>
				) : (
					<FormInput
						type='text'
						placeholder='전화번호'
						required
						name='phone'
						errors={state.errors?.formErrors}
					/>
				)}
				<FormButton text={state.token ? "알맞은 코드를 입력해주세요" : "인증 문자 보내기."} />
			</form>
		</div>
	);
};

export default SMSLogin;
