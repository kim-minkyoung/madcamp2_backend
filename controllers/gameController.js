// controllers/gameController.js

var cron = require("node-cron");
let currentGlobalWord = setRandomWord();
const User = require("../models/User");

exports.getGlobalWord = (req, res) => {
  try {
    res.json({ word: currentGlobalWord });
  } catch (error) {
    console.error("글로벌 단어 제공 중 오류:", error);
    res.status(500).json({ error: "글로벌 단어 제공 중 오류가 발생했습니다." });
  }
};

// 매 시 정각 (0분)에 실행되도록 설정
cron.schedule("0 * * * *", async () => {
  try {
    currentGlobalWord = setRandomWord();
    console.log(`매 시 정각에 새로운 랜덤 단어: ${currentGlobalWord}`);

    await resetPlayCount();
  } catch (error) {
    console.error("Cron job 실행 중 오류:", error);
  }
});

const resetPlayCount = async () => {
  try {
    await User.updateMany({}, { playCount: 0, score: 0 });
    console.log("모든 사용자의 playCount, score가 0으로 초기화되었습니다.");
  } catch (error) {
    console.error("playCount 초기화 중 오류:", error);
  }
};

// 랜덤 단어 생성 함수
function setRandomWord() {
  const words = [
    "항공모함(aircraft carrier)",
    "비행기(airplane)",
    "알람 시계(alarm clock)",
    "구급차(ambulance)",
    "천사(angel)",
    "동물 이주(animal migration)",
    "개미(ant)",
    "모루(anvil)",
    "사과(apple)",
    "팔(arm)",
    "아스파라거스(asparagus)",
    "도끼(axe)",
    "배낭(backpack)",
    "바나나(banana)",
    "붕대(bandage)",
    "헛간(barn)",
    "야구(baseball)",
    "야구 방망이(baseball bat)",
    "바구니(basket)",
    "농구(basketball)",
    "박쥐(bat)",
    "욕조(bathtub)",
    "해변(beach)",
    "곰(bear)",
    "수염(beard)",
    "침대(bed)",
    "벌(bee)",
    "벨트(belt)",
    "벤치(bench)",
    "자전거(bicycle)",
    "쌍안경(binoculars)",
    "새(bird)",
    "생일 케이크(birthday cake)",
    "블랙베리(blackberry)",
    "블루베리(blueberry)",
    "책(book)",
    "부메랑(boomerang)",
    "병뚜껑(bottlecap)",
    "나비넥타이(bowtie)",
    "팔찌(bracelet)",
    "뇌(brain)",
    "빵(bread)",
    "다리(bridge)",
    "브로콜리(broccoli)",
    "빗자루(broom)",
    "양동이(bucket)",
    "불도저(bulldozer)",
    "버스(bus)",
    "관목(bush)",
    "나비(butterfly)",
    "선인장(cactus)",
    "케이크(cake)",
    "계산기(calculator)",
    "달력(calendar)",
    "낙타(camel)",
    "카메라(camera)",
    "위장(camouflage)",
    "캠프파이어(campfire)",
    "양초(candle)",
    "대포(cannon)",
    "카누(canoe)",
    "자동차(car)",
    "당근(carrot)",
    "성(castle)",
    "고양이(cat)",
    "천장 선풍기(ceiling fan)",
    "첼로(cello)",
    "휴대전화(cell phone)",
    "의자(chair)",
    "샹들리에(chandelier)",
    "교회(church)",
    "원(circle)",
    "클라리넷(clarinet)",
    "시계(clock)",
    "구름(cloud)",
    "커피 컵(coffee cup)",
    "나침반(compass)",
    "컴퓨터(computer)",
    "쿠키(cookie)",
    "쿨러(cooler)",
    "소파(couch)",
    "소(cow)",
    "게(crab)",
    "크레용(crayon)",
    "악어(crocodile)",
    "왕관(crown)",
    "유람선(cruise ship)",
    "컵(cup)",
    "다이아몬드(diamond)",
    "식기세척기(dishwasher)",
    "다이빙 보드(diving board)",
    "개(dog)",
    "돌고래(dolphin)",
    "도넛(donut)",
    "문(door)",
    "용(dragon)",
    "옷장(dresser)",
    "드릴(drill)",
    "드럼(drums)",
    "오리(duck)",
    "덤벨(dumbbell)",
    "귀(ear)",
    "팔꿈치(elbow)",
    "코끼리(elephant)",
    "봉투(envelope)",
    "지우개(eraser)",
    "눈(eye)",
    "안경(eyeglasses)",
    "얼굴(face)",
    "선풍기(fan)",
    "깃털(feather)",
    "울타리(fence)",
    "손가락(finger)",
    "소화전(fire hydrant)",
    "벽난로(fireplace)",
    "소방차(firetruck)",
    "물고기(fish)",
    "플라밍고(flamingo)",
    "손전등(flashlight)",
    "슬리퍼(flip flops)",
    "스탠드(floor lamp)",
    "꽃(flower)",
    "비행접시(flying saucer)",
    "발(foot)",
    "포크(fork)",
    "개구리(frog)",
    "프라이팬(frying pan)",
    "정원(garden)",
    "정원 호스(garden hose)",
    "기린(giraffe)",
    "염소수염(goatee)",
    "골프 클럽(golf club)",
    "포도(grapes)",
    "잔디(grass)",
    "기타(guitar)",
    "햄버거(hamburger)",
    "망치(hammer)",
    "손(hand)",
    "하프(harp)",
    "모자(hat)",
    "헤드폰(headphones)",
    "고슴도치(hedgehog)",
    "헬리콥터(helicopter)",
    "헬멧(helmet)",
    "육각형(hexagon)",
    "하키 퍽(hockey puck)",
    "하키 스틱(hockey stick)",
    "말(horse)",
    "병원(hospital)",
    "열기구(hot air balloon)",
    "핫도그(hot dog)",
    "온수 욕조(hot tub)",
    "모래시계(hourglass)",
    "집(house)",
    "실내 식물(house plant)",
    "허리케인(hurricane)",
    "아이스크림(ice cream)",
    "재킷(jacket)",
    "감옥(jail)",
    "캥거루(kangaroo)",
    "열쇠(key)",
    "키보드(keyboard)",
    "무릎(knee)",
    "칼(knife)",
    "사다리(ladder)",
    "랜턴(lantern)",
    "노트북(laptop)",
    "잎(leaf)",
    "다리(leg)",
    "전구(light bulb)",
    "라이터(lighter)",
    "등대(lighthouse)",
    "번개(lightning)",
    "선(line)",
    "사자(lion)",
    "립스틱(lipstick)",
    "바닷가재(lobster)",
    "사탕(lollipop)",
    "우체통(mailbox)",
    "지도(map)",
    "마커(marker)",
    "성냥(matches)",
    "확성기(megaphone)",
    "인어(mermaid)",
    "마이크(microphone)",
    "전자레인지(microwave)",
    "원숭이(monkey)",
    "달(moon)",
    "모기(mosquito)",
    "오토바이(motorbike)",
    "산(mountain)",
    "쥐(mouse)",
    "콧수염(moustache)",
    "입(mouth)",
    "머그잔(mug)",
    "버섯(mushroom)",
    "손톱(nail)",
    "목걸이(necklace)",
    "코(nose)",
    "바다(ocean)",
    "팔각형(octagon)",
    "문어(octopus)",
    "양파(onion)",
    "오븐(oven)",
    "올빼미(owl)",
    "붓(paintbrush)",
    "페인트 통(paint can)",
    "야자수(palm tree)",
    "판다(panda)",
    "바지(pants)",
    "종이 클립(paper clip)",
    "낙하산(parachute)",
    "앵무새(parrot)",
    "여권(passport)",
    "땅콩(peanut)",
    "배(pear)",
    "완두콩(peas)",
    "연필(pencil)",
    "펭귄(penguin)",
    "피아노(piano)",
    "픽업 트럭(pickup truck)",
    "액자(picture frame)",
    "돼지(pig)",
    "베개(pillow)",
    "파인애플(pineapple)",
    "피자(pizza)",
    "플라이어(pliers)",
    "경찰차(police car)",
    "연못(pond)",
    "수영장(pool)",
    "아이스바(popsicle)",
    "엽서(postcard)",
    "감자(potato)",
    "콘센트(power outlet)",
    "지갑(purse)",
    "토끼(rabbit)",
    "너구리(raccoon)",
    "라디오(radio)",
    "비(rain)",
    "무지개(rainbow)",
    "갈퀴(rake)",
    "리모컨(remote control)",
    "코뿔소(rhinoceros)",
    "소총(rifle)",
    "강(river)",
    "롤러코스터(roller coaster)",
    "롤러스케이트(rollerskates)",
    "범선(sailboat)",
    "샌드위치(sandwich)",
    "톱(saw)",
    "색소폰(saxophone)",
    "스쿨버스(school bus)",
    "가위(scissors)",
    "전갈(scorpion)",
    "드라이버(screwdriver)",
    "바다거북(sea turtle)",
    "시소(see saw)",
    "상어(shark)",
    "양(sheep)",
    "신발(shoe)",
    "반바지(shorts)",
    "삽(shovel)",
    "싱크대(sink)",
    "스케이트보드(skateboard)",
    "해골(skull)",
    "고층 건물(skyscraper)",
    "침낭(sleeping bag)",
    "웃는 얼굴(smiley face)",
    "달팽이(snail)",
    "뱀(snake)",
    "스노클(snorkel)",
    "눈송이(snowflake)",
    "눈사람(snowman)",
    "축구공(soccer ball)",
    "양말(sock)",
    "스피드보트(speedboat)",
    "거미(spider)",
    "숟가락(spoon)",
    "스프레드시트(spreadsheet)",
    "정사각형(square)",
    "곡선(squiggle)",
    "다람쥐(squirrel)",
    "계단(stairs)",
    "별(star)",
    "스테이크(steak)",
    "스테레오(stereo)",
    "청진기(stethoscope)",
    "바늘땀(stitches)",
    "정지 신호(stop sign)",
    "스토브(stove)",
    "딸기(strawberry)",
    "가로등(streetlight)",
    "깍지콩(string bean)",
    "잠수함(submarine)",
    "여행 가방(suitcase)",
    "태양(sun)",
    "백조(swan)",
    "스웨터(sweater)",
    "그네(swing set)",
    "검(sword)",
    "주사기(syringe)",
    "테이블(table)",
    "주전자(teapot)",
    "테디 베어(teddy bear)",
    "전화(telephone)",
    "텔레비전(television)",
    "테니스 라켓(tennis racquet)",
    "텐트(tent)",
    "에펠탑(The Eiffel Tower)",
    "만리장성(The Great Wall of China)",
    "모나리자(The Mona Lisa)",
    "호랑이(tiger)",
    "토스터(toaster)",
    "발가락(toe)",
    "화장실(toilet)",
    "이(tooth)",
    "칫솔(toothbrush)",
    "치약(toothpaste)",
    "토네이도(tornado)",
    "트랙터(tractor)",
    "신호등(traffic light)",
    "기차(train)",
    "나무(tree)",
    "삼각형(triangle)",
    "트롬본(trombone)",
    "트럭(truck)",
    "트럼펫(trumpet)",
    "티셔츠(t-shirt)",
    "우산(umbrella)",
    "속옷(underwear)",
    "밴(van)",
    "꽃병(vase)",
    "바이올린(violin)",
    "세탁기(washing machine)",
    "수박(watermelon)",
    "워터슬라이드(waterslide)",
    "고래(whale)",
    "바퀴(wheel)",
    "풍차(windmill)",
    "와인 병(wine bottle)",
    "와인 잔(wine glass)",
    "손목시계(wristwatch)",
    "요가(yoga)",
    "얼룩말(zebra)",
    "지그재그(zigzag)",
  ];

  return words[Math.floor(Math.random() * words.length)];
}
