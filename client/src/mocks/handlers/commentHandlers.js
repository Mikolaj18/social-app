import {rest} from 'msw';

export const commentHandlers = [
    rest.get('http://localhost:8800/comments/:postId', async (req, res, ctx) => {
        const { postId } = req.params;
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 2,
                    author: 1,
                    description: "Comment 1",
                    postId: Number(postId),
                },
                {
                    id: 3,
                    author: 1,
                    description: "Comment 2",
                    postId: Number(postId),
                },
                {
                    id: 4,
                    author: 2,
                    description: "Comment 3",
                    postId: Number(postId),
                }
            ]),
        );
    }),
    rest.post('http://localhost:8800/comments', async (req, res, ctx) => {
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
    rest.put('http://localhost:8800/comments/:commentId', async (req, res, ctx) => {
        const { commentId } = req.params;
        const commentData = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(commentId),
                ...commentData
            }),
        );
    }),
    rest.delete('http://localhost:8800/comments/:commentId', async (req, res, ctx) => {
        const {commentId} = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(commentId),
            }),
        );
    }),
];