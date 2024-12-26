'use server';
import { Prisma } from '@prisma/client';
import prisma from '../../../prisma/db';
import { hashSync } from 'bcrypt';

export const registerUser = async (body: Prisma.UserCreateInput) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            throw new Error('User already exists');
        }

        const createdUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });
        return createdUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
