const express = require("express")
const router = express.Router()

const checkAuth = require("../middlewares/checkAuth")
const userService = require("../services/userService")

// 로그인
router.post("/login", async (req, res) => {
    const uid = req.body.uid
    const upw = req.body.upw

    const login = await userService.login(uid, upw)

    return res.json({ login })
})

// 회원가입
router.post("/join", async (req, res) => {
    const uid = req.body.uid
    const upw = req.body.upw
    const name = req.body.name

    const join = await userService.join(uid, upw, name)

    return res.json({ join })
})

// 마이페이지
router.get("/mypage", checkAuth, async (req, res) => {
    const userId = req.user.id

    const mypage = await userService.mypage(userId)

    return res.json({ mypage })
})

// 관심목록 추가
// *** :id 위치 /likes:id
router.post("/:id/likes", checkAuth, async (req, res) => {
    const userId = req.user.id
    const clubId = req.params.id
    
    const addLikes = await userService.addLikes(userId, clubId)

    return res.json({ addLikes })
})

// 관심목록 삭제
router.delete("/:id/likes", checkAuth, async (req, res) => {
    const userId = req.user.id
    const clubId = req.params.id

    const deleteLikes = await userService.deleteLikes(userId, clubId)

    return res.json({ deleteLikes })
})

module.exports = router;
