'use strict'


const User = use('App/Models/User');

class UserController {
    async signup({ request }) {
        const { username, email, password } = request.all();
        console.log(username, email, password);
        await User.create({
            email,
            password,
            username
        });
        return this.signin(...arguments);
    }

    async signin({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
        return token;
    }

    async signout({ request, auth }) {
        
    }
}

module.exports = UserController
