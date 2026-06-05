import pool from '../config/db.js';

export const createOrder = async (req, res) => {
    const { userId, totalPrice, orderItems } = req.body;
}