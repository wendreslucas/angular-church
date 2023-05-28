import React, { useEffect } from 'react';
import { Container, Form, FormError, Header } from './styles';
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { api } from '../../lib/axios';

const registerFormSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'Minimo 3 caracteres' })
		.regex(/^([a-z\\-]+)$/i, {
			message: 'O usuário pode ter apenas letras e hifens',
		})
		.transform((username) => username.toLocaleLowerCase()),

	name: z.string().min(3, { message: 'Minimo 3 caracteres' }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	useEffect(() => {
		if (router.query.username) {
			setValue('username', String(router.query.username));
		}
	}, [router.query?.username, setValue]);

	async function handleRegister(data: any) {
		try {
			await api.post('/users', {
				name: data.name,
				username: data.username,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container>
			<Header>
				<Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
				<Text>
					Precisamos de algumas informações para criar seu perfil! Ah, você pode
					editar essas informações depois.
				</Text>
				<MultiStep size={4} currentStep={1} />
			</Header>
			<Form as="form" onSubmit={handleSubmit(handleRegister)}>
				<label>
					<Text size="sm">Nome de usuário</Text>
					<TextInput
						prefix="ignite.com/"
						placeholder="seu-usuario"
						{...register('username')}
					/>
					{errors.username && (
						<FormError size="sm">{errors.username.message}</FormError>
					)}
				</label>
				<label>
					<Text size="sm">Nome completo</Text>
					<TextInput placeholder="seu nome" {...register('name')} />
					{errors.name && <FormError size="sm">{errors.name.message}</FormError>}
				</label>
				<Button type="submit" disabled={isSubmitting}>
					Próximo passo
					<ArrowRight />
				</Button>
			</Form>
		</Container>
	);
}
