import {rest} from 'msw';

export const friendRequestsHandlers = [
    rest.post('http://localhost:8800/friends', async (req, res, ctx) => {
        const data = await req.json();
        return res(
            ctx.status(201),
            ctx.json(
                {
                    sender: 1,
                    status: 'pending',
                    ...data,
                },
            ),
        );
    }),
];