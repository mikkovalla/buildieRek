const app = require('../index')
const supertest = require('supertest')
const userRouter = require('../routers/user')
const authRouter = require('../routers/auth')

const api = supertest(app)

beforeAll(() => {
    api
        .post('/api/login')
        .send({
            email: process.env.EMAIL,
            password: process.env.PW
        })
        .expect(200)
})

test('Login user', async () => {
    await api
        .post('/api/login')
        .send({
            email: process.env.EMAIL,
            password: process.env.PW
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Logout current user', async () => {
    await api
        .post('/api/logout')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(200)
})

test('Adding a new user requires password value', async () => {
    await api
        .post('/api/users')
        .send({
            "name": "pauli",
            "email": "pauli@pauli.fi"
        })
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('Adding new user with required fields works', async () => {
    await api
        .post('/api/users')
        .send({
            "name": "pirjo2",
            "email": "pirjo2@pauli.fi",
            "password": "pirjo212345"
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('If property exits adding user fails', async () => {
    await api
        .post('/api/users')
        .send({
            "name": "pirjo",
            "email": "pirjo@pauli.fi",
            "password": "pirjo12345"
        })
        .expect(400, {
            driver: true,
            name: 'MongoError',
            index: 0,
            code: 11000,
            keyPattern: {
                email: 1
            },
            keyValue: {
                email: 'pirjo@pauli.fi'
            }
        })
        .expect('Content-Type', /application\/json/)
})

test('Get current logged in user details', async () => {
    await api
        .get('/api/users/me')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Delete current user', async () => {
    await api
        .delete('/api/users/me')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .expect(200)
})

test('Get error for unauhorized attempt', async () => {
    await api
        .delete('/api/users/me')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
        .send()
        .expect(401)
})