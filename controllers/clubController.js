const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router()

const clubService = require("../services/clubService")

// 모임 불러오기
router.get("/", checkAuth, async (req, res) => {
    const userId = req.user.id
    
    const newClubs = await clubService.getNew();
    const allClubs = await clubService.getAll();
    const categories = await clubService.getCategories();
    const joinInfos = await clubService.getJoinInfos();
    const likedClubsById = await clubService.getLikedClubsById(userId);
    
    return res.json({ newClubs, allClubs, categories, joinInfos, likedClubsById });
})

// 모임별 디테일 페이지
router.get("/:id", checkAuth, async (req, res) => {
    const clubId = req.params.id
    const userId = req.user.id
    
    const getClubsById = await clubService.getClubsById(clubId)
    const getJoinInfoById = await clubService.getJoinInfoById({ clubId, userId })
    const countJoinedUsers = await clubService.getCountJoinedUsersById(clubId)
    
    return res.json({ getClubsById, getJoinInfoById, countJoinedUsers });
})

// 모임 가입신청
router.post("/apply", checkAuth, async (req, res) => {
    const clubId = req.body.id
    const userId = req.user.id

    await clubService.applyToClub({ clubId, userId })

    return res.json({ reslut: "SUCCESS" })
})

module.exports = router;