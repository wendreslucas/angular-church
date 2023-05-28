import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { setCookie } from 'nookies';

const sevenDays = 60 * 24 * 7; // 7 days

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const { name, username } = req.body;

	const userExists = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (userExists) {
		return res.status(400).json({
			message: 'User already exists',
		});
	}

	const user = await prisma.user.create({
		data: {
			name,
			username,
		},
	});

	setCookie({ res }, '@angch:userId', user.id, {
		maxAge: sevenDays,
		path: '/',
	});

	return res.status(201).json(user);
}
