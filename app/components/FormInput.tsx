import { InputHTMLAttributes } from "react";

interface FormInputProps {
	name: string;
	errors?: string[];
}

const FormInput = ({ name, errors = [], ...extraProps }: FormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<div className='flex flex-col gap-2 justify-center items-center'>
			<label className='form-control w-full max-w-xs'>
				<input
					{...extraProps}
					name={name}
					className='input input-bordered w-full max-w-xs ring-2 focus:ring-4 transition'
				/>
				<div className='label'>
					<span className='text-red-500 font-medium'>{errors[0]}</span>
				</div>
			</label>
		</div>
	);
};

export default FormInput;
