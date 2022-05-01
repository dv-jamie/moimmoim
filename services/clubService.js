const db = require("../libs/db")

const CLUBS_WITH_CATEGORIES =
    `SELECT cb.id AS clubs_id, cb.name AS clubs_name, location, capacity, img, views, description,
    cg.id AS categories_id, cg.name AS categories_name
    FROM clubs AS cb LEFT JOIN categories AS cg ON cb.category_id = cg.id`
const JOIN_INFO_WITH_USERS =
    `SELECT users.id, users.name, status FROM clubs_users
    LEFT JOIN users ON clubs_users.user_id = users.id`

const clubService = {
    getNew: async () => {
        const contentSize = 4;
        
        const conn = await db.getConnection();
        
        const [newClubs] = await conn.query(`${CLUBS_WITH_CATEGORIES} ORDER BY cb.id DESC LIMIT ${contentSize}`);
        
        conn.release();
        
        return newClubs;
    },
    getAll: async () => {
        const conn = await db.getConnection();

        const [clubs] = await conn.query(`${CLUBS_WITH_CATEGORIES}`);
        
        conn.release();
        
        return { clubs };
    },
    getCategories: async () => {
        const conn = await db.getConnection();
        
        const [categories] = await conn.query("SELECT * FROM categories");
        
        conn.release();
        
        return categories;
    },
    getJoinInfos: async () => {
        const conn = await db.getConnection();
        
        const [joinInfos] = await conn.query("SELECT * FROM clubs_users WHERE status = 'JOINED'");
        
        conn.release();
        
        return joinInfos;
    },
    getLikedClubsById : async (userId) => {
        const conn = await db.getConnection();
        
        const [likedClubsById] = await conn.query("SELECT club_id FROM likes WHERE user_id = ?", [userId])
        
        conn.release();

        return likedClubsById
    },
    getClubsById: async (clubId) => {
        const conn = await db.getConnection();
        
        const [clubsById] = await conn.query(`${CLUBS_WITH_CATEGORIES} WHERE cb.id = ?`, [clubId]);
        
        conn.release();
        
        return clubsById[0];
    },
    getJoinInfoById: async ({ clubId, userId }) => {
        const conn = await db.getConnection();
        
        const [joinInfoByClubId] = await conn.query(
            `${JOIN_INFO_WITH_USERS}
            WHERE club_id = ?`, [clubId]);
        const [joinInfoByClubAndUserIds] = await conn.query(
            `${JOIN_INFO_WITH_USERS}
            WHERE club_id = ? AND user_id = ?`, [clubId, userId]);
            
        conn.release();
        
        return { joinInfoByClubId, joinInfoByClubAndUserIds };
    },
    getCountJoinedUsersById: async (clubId) => {
        const conn = await db.getConnection();
        
        const [countJoinedUsers] = await conn.query(
            `SELECT COUNT(*) AS count FROM clubs_users
            WHERE status = "JOINED" AND club_id = ?`, [clubId]);
        
        conn.release();
        
        return countJoinedUsers[0].count;
    },
    applyToClub: async({ clubId, userId }) => {
        const conn = await db.getConnection();
        
        await conn.query(`INSERT INTO clubs_users VALUE (?, ?, now(), NULL, NULL, "APPLIED")`, [clubId, userId])
        
        conn.release();

        return
    }
}

module.exports = clubService;