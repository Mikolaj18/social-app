import {rest} from 'msw';

export const commentHandlers = [
    rest.get('http://localhost:8800/comments/:postId', async (req, res, ctx) => {
        const postId = 2
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 2,
                    author: 1,
                    description: "Comment 1",
                    postId: postId,
                },
                {
                    id: 3,
                    author: 1,
                    description: "Comment 2",
                    postId: postId,
                },
                {
                    id: 4,
                    author: 2,
                    description: "Comment 3",
                    postId: postId,
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
                    postId: 2,
                    ...data,
                },
            ),
        );
    }),
    rest.put('http://localhost:8800/posts/:postId', async (req, res, ctx) => {
        const { postId } = req.params;
        const postData = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(postId),
                ...postData
            }),
        );
    }),
    rest.delete('http://localhost:8800/posts/:postId', async (req, res, ctx) => {
        const {postId} = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(postId),
            }),
        );
    }),
];