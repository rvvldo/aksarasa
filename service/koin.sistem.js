import {pool} from '../config/db.js';

export const koinSistemNovel = async (req, res) => {
    const { userId, koin } = req.body;

    try {
        const koinBaru = Number(koin) + 10;

        const query = 'UPDATE users SET koin = $1 WHERE id = $2 RETURNING *';
        const values = [koinBaru, userId];

        const result = await pool.query(query, values)
        const updatedUser = result.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Koin berhasil ditambahkan',
            user: {
                username: updatedUser.username,
                koin: updatedUser.koin
            }
        })
    } catch (error) {
        console.error('Error updating koin:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal menambahkan koin'
        });
    }
}

export const koinSistemQuiz = async (req, res) => {
    const { userId, koin, score } = req.body;

    try {
        const koinBaru = Number(koin) + Number(score);

        const query = 'UPDATE users SET koin = $1 WHERE id = $2 RETURNING *';
        const values = [koinBaru, userId];

        const result = await pool.query(query, values);
        const updatedUser = result.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Koin berhasil ditambahkan',
            user: {
                username: updatedUser.username,
                koin: updatedUser.koin
            }
        });
    } catch (error) {
        console.error('Error updating koin:', error);
        return res.status(500).json({
            success: false,
            message: 'Gagal menambahkan koin'
        });
    }
}