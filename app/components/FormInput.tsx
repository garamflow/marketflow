interface FormInputProps {
	type: string;
	placeholder: string;
	required: boolean;
	name: string;
	errors: string[];
}

const FormInput = ({ type, placeholder, required, name, errors }: FormInputProps) => {
	return (
		<div className='flex flex-col gap-2 justify-center items-center'>
			<label className='form-control w-full max-w-xs'>
				<input
					type={type}
					placeholder={placeholder}
					required={required}
					name={name}
					className='input input-bordered w-full max-w-xs ring-2 focus:ring-4 transition'
				/>
				<div className='label'>
					{errors.map((error, index) => (
						<span
							key={index}
							className='text-red-500 font-medium'
						>
							{error}
						</span>
					))}
				</div>
			</label>
		</div>
	);
};

export default FormInput;
