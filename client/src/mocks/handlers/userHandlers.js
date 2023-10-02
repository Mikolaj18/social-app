import {rest} from 'msw';

export const userHandlers = [
    rest.get('http://localhost:8800/users/:id', async (req, res, ctx) => {
        const { id } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                id: Number(id),
                name: 'John',
                surname: 'Doe',
                email: 'johndoe@mail.com',
                profilePicture: '',
                coverPicture: '',
                work: 'teacher',
                from: 'London',
                livesIn:'London',
                description: 'lorem ipsum',
            }),
        );
    }),
    rest.put(`http://localhost:8800/users/edit/:id`, async (req, res, ctx) => {
        const { id } = req.params;
        const userData = await req.json();
        return res(
            ctx.status(200),
            ctx.json({
                id,
                ...userData
            }),
        );
    }),
];