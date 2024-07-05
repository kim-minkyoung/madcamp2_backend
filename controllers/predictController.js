const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// 이미지 데이터 로드 함수
function loadImageData(imagePath) {
  try {
    const fullImagePath = path.resolve(__dirname, "../", imagePath);
    if (!fs.existsSync(fullImagePath)) {
      throw new Error(
        `이미지 파일이 경로 ${fullImagePath}에 존재하지 않습니다.`
      );
    }

    const imageBuffer = fs.readFileSync(fullImagePath);
    const imageData = tf.node.decodeImage(imageBuffer);
    return imageData;
  } catch (error) {
    console.error(
      `이미지 데이터를 로드하는 동안 오류가 발생했습니다: ${error.message}`
    );
    throw error;
  }
}

// TensorFlow Lite 모델 로드 함수
async function loadModel(modelPath) {
  try {
    const model = await tf.loadGraphModel(`file://${modelPath}`);
    return model;
  } catch (error) {
    console.error(`모델을 로드하는 동안 오류가 발생했습니다: ${error.message}`);
    throw error;
  }
}

// 추론 실행 함수
async function runInference(model, imageData) {
  try {
    const resizedImage = tf.image.resizeBilinear(imageData, [28, 28]);
    const batchedImage = resizedImage.expandDims(0); // 배치 차원을 추가
    const prediction = model.predict(batchedImage);
    return prediction.arraySync();
  } catch (error) {
    console.error(`추론을 실행하는 동안 오류가 발생했습니다: ${error.message}`);
    throw error;
  }
}

// 예측 처리 함수
async function handlePrediction(req, res, next) {
  try {
    const { imagePath } = req.body;
    if (!imagePath) {
      return res
        .status(400)
        .json({ error: "이미지 경로가 요청 바디에 포함되지 않았습니다." });
    }

    const modelPath = path.join(__dirname, "../models/model.tflite");
    console.log(`모델 경로: ${modelPath}`);

    const model = await loadModel(modelPath);
    console.log("모델 로드 완료");

    const imageData = loadImageData(imagePath);
    console.log("이미지 데이터 로드 완료");

    const prediction = await runInference(model, imageData);
    console.log("추론 완료:", prediction);

    res.json({ prediction });
  } catch (error) {
    console.error("예측 처리 중 오류 발생:", error);
    next(error);
  }
}

module.exports = {
  loadImageData,
  loadModel,
  runInference,
  handlePrediction,
};
