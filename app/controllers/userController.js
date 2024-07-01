import User from '../models/User.js';

export default {
    async createUser(req, res) {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });

        return res.json(user);
    },

    async getUsers(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);

        user.name = name;
        user.email = email;
        user.password = password;

        await user.save();

        return res.json(user);
    },

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        return res.status(200).json({ message: 'User deleted' });
        } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        }
    }
}