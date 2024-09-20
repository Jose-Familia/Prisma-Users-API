const express = require('express');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Create a new user
app.post(`/user`, async (req, res) => {
    const {name, email} = req.body;
    const user = await prisma.user.create({
        data: {
            name,email
        }
    });
    res.json(user);
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get a single user
app.get('/user/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});

// Update a user
app.put('/user/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            email
        }
    });
    res.json(user);
});

// Delete a user
app.delete('/user/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

