import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../prisma/db';
import { compare, hashSync } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials?.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === 'credentials') {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        email: user.email,
                    },
                });

                if (findUser) return true;

                await prisma.user.create({
                    data: {
                        email: user.email,
                        password: hashSync(user.id, 10),
                    },
                });
                return true;
            } catch (err) {
                console.error(err);
            }
        },
        async jwt({ token }) {
            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email!,
                },
            });

            if (findUser) {
                token.id = findUser.id;
                token.email = findUser.email;
                token.role = findUser.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};
