// import type { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../../prisma/db';
// import { notFound } from 'next/navigation';

// export async function GET(
//     req: NextApiRequest,
//     { params }: { params: { id: string } },
//     res: NextApiResponse
// ) {
//     const id = params.id;
//     console.log(id);
//     if (!id || typeof id !== 'string') {
//         return notFound();
//     }

//     const configuration = await prisma.configuration.findUnique({
//         where: {
//             id,
//         },
//     });

//     if (!configuration) {
//         return notFound();
//     }

//     return res.json(configuration);
// }
