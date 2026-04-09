import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = 'SELECT * FROM users WHERE username = $1';
    
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.rows.length) return res.status(409).json('User already exists!');
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = 'INSERT INTO users(username, email, password, name) VALUES ($1, $2, $3, $4)';
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('User has been created.');
        });
    });
};

export const login = (req, res) => {
    const q = 'SELECT * FROM users WHERE username = $1';
    
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.rows.length === 0) return res.status(404).json('User not found!');

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data.rows[0].password);
        if (!isPasswordCorrect) return res.status(400).json('Wrong password or username!');

        const token = jwt.sign({ id: data.rows[0].id }, process.env.JWT_SECRET_KEY);
        const { password, ...others } = data.rows[0];
        
        res
            .cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            })
            .status(200)
            .json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: '/'
    }).status(200).json('User has been logged out.');
};

export const checkUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        return res.status(200).json("Authenticated");
    });
};