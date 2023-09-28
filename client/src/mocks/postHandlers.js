import {rest} from 'msw';

export const postHandlers = [
    rest.get('http://localhost:8800/posts', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    author: 1,
                    description: "Post 1",
                },
                {
                    author: 1,
                    description: "Post 2",
                },
                {
                    author: 1,
                    description: "Post 3",
                }
            ]),
        );
    }),
];