import {rest} from 'msw';

export const authHandlers = [
    rest.post('http://localhost:8800/auth/register', async (req, res, ctx) => {
        const data = await req.json();
        return res(
            ctx.status(201),
            ctx.json(
                {
                    ...data,
                },
            ),
        );
    }),
    rest.post('http://localhost:8800/auth/login', async (req, res, ctx) => {
        const data = await req.json();
        return res(
            ctx.status(200),
            ctx.json(
                {
                    ...data,
                },
            ),
        );
    }),
    rest.post('http://localhost:8800/auth/logout', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({message: 'User has been logged out'})
        );
    }),
];