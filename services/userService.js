const db = require("../libs/db")
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdsfas1234sdefg1234567"

const userService = {
    login: async (uid, upw) => {
        const conn = await db.getConnection();
    
        const [user] = await conn.query("SELECT * FROM users WHERE uid = ? AND upw = ?", [uid, upw]);

        conn.release();
        
        if(user.length === 0) {
            return {result: "FAILED"};
        }
        
        const jwtToken = jwt.sign({ id: user[0].id }, jwtSecret)

        return { result: "SUCCESS", jwtToken};
    },
    join: async (uid, upw, name) => {
        const conn = await db.getConnection();
    
        await conn.query("INSERT INTO users (uid, upw, name) VALUES (?, ?, ?)", [uid, upw, name]);
    
        conn.release();

        return { result: "SUCCESS" }
    },
    mypage: async (userId) => {
        if (userId === 0) {
            return { result: "NEED_LOGIN" }
        } else {
            const conn = await db.getConnection();
    
            const [user] = await conn.query("SELECT * FROM users WHERE id = ?", [userId])
    
            const [joinedClubsByUser] = await conn.query(
                `SELECT apply_at, join_at, reject_at, status,
                    c.id AS club_id, c.name AS club_name, c.img AS club_img FROM clubs_users AS cu
                LEFT JOIN clubs AS c ON cu.club_id = c.id
                WHERE cu.user_id = ?
                ORDER BY apply_at`, [userId]);
            const [likedClubsByUser] = await conn.query(
                `SELECT c.id AS club_id, c.name AS club_name, c.img AS club_img,
                    apply_at, join_at, reject_at, status FROM likes AS l
                LEFT JOIN clubs AS c ON l.club_id = c.id
                LEFT JOIN clubs_users AS cu ON l.user_id = cu.user_id AND c.id = cu.club_id
                WHERE l.user_id = ?
                ORDER BY apply_at`, [userId]);
        
            conn.release();
        
            return { result: "SUCCESS", user: user[0], joinedClubsByUser, likedClubsByUser }
        }
    },
    addLikes: async (userId, clubId) => {
        const conn = await db.getConnection();
    
        await conn.query("INSERT INTO likes VALUE (?, ?)", [userId, clubId])
    
        conn.release();
    
        return { result: "SUCCESS" }
    },
    deleteLikes: async (userId, clubId) => {
        const conn = await db.getConnection();
    
        await conn.query("DELETE FROM likes WHERE user_id = ? AND club_id = ?", [userId, clubId])
    
        conn.release();
    
        return { result: "SUCCESS" }
    },
}

module.exports = userService;