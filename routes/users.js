// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

// 이메일 중복 여부 확인
router.post("/checkEmail", userController.checkEmail);

// 사용자 정보 조회
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  }
});

// // 파일 업로드를 위한 Multer 설정
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// 사용자 정보 수정 (프로필 사진 및 닉네임)
// router.put("/:userId", upload.single("profileImage"), async (req, res) => {
//   try {
//     const { nickname } = req.body;
//     let updatedUserData = { nickname };

//     // 프로필 사진 업데이트 처리
//     if (req.file) {
//       updatedUserData.profilePicture = req.file.filename;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       updatedUserData,
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).send("User not found");
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating user");
//   }
// });

module.exports = router;
