import { Button, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { Form } from './styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ClaimUsernameFormData = z.object({
	username: z
		.string()
		.min(3, { message: 'Minimo 3 caracteres' })
		.regex(/^([a-z\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras e hifens',
		})
		.transform((username) => username.toLocaleLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormData>;

export function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClaimUsernameFormData>({
		resolver: zodResolver(ClaimUsernameFormData),
	});

	async function handleClaimUsername(data: ClaimUsernameFormData) {
		console.log(data);
	}

	return (
		<Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
			<TextInput
				size="sm"
				prefix="ignite.com/"
				placeholder="seu-usuário"
				{...register('username')}
			/>
			<Button size="sm" type="submit">
				Reservar
				<ArrowRight />
			</Button>
			{errors.username?.message}
		</Form>
	);
}
