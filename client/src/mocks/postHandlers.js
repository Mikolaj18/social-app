import {rest} from 'msw';

export const postHandlers = [
    rest.get('http://localhost:8800/posts', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    author: 1,
                    description: "Post 1",
                    file: "image.jpg",
                },
                {
                    author: 1,
                    description: "Post 2",
                    file: "image.png",
                },
                {
                    author: 1,
                    description: "Post 3",
                    file: "",
                }
            ]),
        );
    }),
    rest.post('http://localhost:8800/posts', async (req, res, ctx) => {
        const data = await req.json();
        return res(
            ctx.status(201),
            ctx.json(
                {
                    author: 1,
                    ...data,
                },
            ),
        );
    }),
];