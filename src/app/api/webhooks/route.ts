import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '../../../../prisma/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        console.log('body =  ' + body);
        const signature = headers().get('stripe-signature');
        console.log('signature =  ' + signature);
        if (!signature)
            return new Response('Invalid signature', { status: 400 });

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );

        if (event.type === 'checkout.session.completed') {
            console.log('completed');
            const session = event.data.object as Stripe.Checkout.Session;

            if (!session.customer_details?.email) {
                throw new Error('Missing user email');
            }

            console.log('session.metadata = ' + session.metadata);
            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            };
            console.log('userId = ' + userId);
            console.log('orderId = ' + orderId);

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata');
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.shipping_details!.address;

            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state!,
                        },
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,
                            state: billingAddress!.state!,
                        },
                    },
                },
            });
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: 'Something went wring', ok: false },
            { status: 500 }
        );
    }
}
