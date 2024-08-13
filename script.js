let drawStage = 0; // 0: Fifth Prize, 1: Fourth Prize, 2: Third Prize, 3: Second Prize, 4: Grand Prize
let drawInProgress = false;
let randomIntervalId; // 用于存储随机跳动的 interval ID

const grandPrizeNumber = 5;
let secondPrizeNumber = 0;
let thirdPrizeNumber = 0;
let fourthPrizeNumber = 0;
let fifthPrizeNumber = 0;

function startDraw() {
    if (drawInProgress) {
        alert('目前已在抽獎中，請稍後再試。');
        return;
    }

    if (drawStage > 4) {
        alert('所有獎項已抽完！');
        return;
    }

    drawInProgress = true;
    playBackgroundMusic(); // 开始播放背景音乐

    switch (drawStage) {
        case 0:
            fifthPrizeNumber = getRandomNumber(1, 5000, [grandPrizeNumber, secondPrizeNumber, thirdPrizeNumber, fourthPrizeNumber]);
            randomIntervalId = displayRandomNumbers('fifthPrizeNumber'); // 开始随机跳动
            break;
        case 1:
            fourthPrizeNumber = getRandomNumber(1, 5000, [grandPrizeNumber, secondPrizeNumber, thirdPrizeNumber, fifthPrizeNumber]);
            randomIntervalId = displayRandomNumbers('fourthPrizeNumber'); // 开始随机跳动
            break;
        case 2:
            thirdPrizeNumber = getRandomNumber(1, 5000, [grandPrizeNumber, secondPrizeNumber, fourthPrizeNumber, fifthPrizeNumber]);
            randomIntervalId = displayRandomNumbers('thirdPrizeNumber'); // 开始随机跳动
            break;
        case 3:
            secondPrizeNumber = getRandomNumber(1, 5000, [grandPrizeNumber, thirdPrizeNumber, fourthPrizeNumber, fifthPrizeNumber]);
            randomIntervalId = displayRandomNumbers('secondPrizeNumber'); // 开始随机跳动
            break;
        case 4:
            randomIntervalId = displayRandomNumbers('grandPrizeNumber'); // 开始随机跳动
            break;
    }
}

function draw() {
    if (!drawInProgress) {
        alert('请先开始抽奖。');
        return;
    }

    clearInterval(randomIntervalId); // 停止随机跳动
    drawInProgress = false;
    stopBackgroundMusic(); // 停止背景音乐

    let resultMessage = '';

    switch (drawStage) {
        case 0:
            document.getElementById('fifthPrizeNumber').innerText = `中獎號碼: ${fifthPrizeNumber}`;
            document.getElementById('fifthPrizeNumber').style.visibility = 'visible';
            resultMessage = `五獎中獎號碼是: ${fifthPrizeNumber}`;
            break;
        case 1:
            document.getElementById('fourthPrizeNumber').innerText = `中獎號碼: ${fourthPrizeNumber}`;
            document.getElementById('fourthPrizeNumber').style.visibility = 'visible';
            resultMessage = `四獎中獎號碼是: ${fourthPrizeNumber}`;
            break;
        case 2:
            document.getElementById('thirdPrizeNumber').innerText = `中獎號碼: ${thirdPrizeNumber}`;
            document.getElementById('thirdPrizeNumber').style.visibility = 'visible';
            resultMessage = `三獎中獎號碼是: ${thirdPrizeNumber}`;
            break;
        case 3:
            document.getElementById('secondPrizeNumber').innerText = `中獎號碼: ${secondPrizeNumber}`;
            document.getElementById('secondPrizeNumber').style.visibility = 'visible';
            resultMessage = `二獎中獎號碼是: ${secondPrizeNumber}`;
            break;
        case 4:
            document.getElementById('grandPrizeNumber').innerText = `中獎號碼: ${grandPrizeNumber}`;
            document.getElementById('grandPrizeNumber').style.visibility = 'visible';
            resultMessage = `大獎中獎號碼是: ${grandPrizeNumber}`;
            break;
    }

    playSoundEffect();
    document.getElementById('result').innerText = resultMessage;

    drawStage++;
}

function displayRandomNumbers(prizeId) {
    const element = document.getElementById(prizeId);
    let intervalId = setInterval(() => {
        element.innerText = `中獎號碼: ${Math.floor(Math.random() * 5000) + 1}`;
        element.style.visibility = 'visible';
    }, 50); // 每50毫秒更新一次
    return intervalId;
}

function playSoundEffect() {
    const sound = document.getElementById('drawSound');
    if (sound) {
        sound.play().catch(error => {
            console.log('播放音效時出錯:', error);
        });
    }
}

function playBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    if (music) {
        music.play().catch(error => {
            console.log('播放音樂時出錯:', error);
        });
    }
}

function stopBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    if (music) {
        music.pause();
        music.currentTime = 0;
    }
}

function getRandomNumber(min, max, exclude) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(num));
    return num;
}
