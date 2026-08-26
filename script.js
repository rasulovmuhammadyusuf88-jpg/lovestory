gsap.registerPlugin(ScrollTrigger);

/* QUIZ AND PASSWORD SYSTEM */
function nextStep(stepNumber) {
    for (let i = 1; i <= 6; i++) {
        const step = document.getElementById('step-' + i);
        if (step) step.classList.add('hidden');
    }
    const next = document.getElementById('step-' + stepNumber);
    if (next) next.classList.remove('hidden');
}

function checkPassword() {
    const input = document.getElementById('pass-input').value.trim().toLowerCase();
    if (input === "madiwxon") {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        
        initThreeHeart();
        startLoveCounter();
        toggleAudio();
    } else {
        alert("Parol noto'g'ri! Qayta urinib ko'ring 💖");
    }
}

/* THREE.JS REAL 3D PARTICLES HEART */
let scene, camera, renderer, heartMesh;

function initThreeHeart() {
    const container = document.getElementById('three-heart-canvas');
    if (!container || container.children.length > 0) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 18;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const points = [];
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        points.push(new THREE.Vector3(x * 0.3, y * 0.3, (Math.random() - 0.5) * 2));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({
        color: 0xff2a74,
        size: 0.4,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    heartMesh = new THREE.Points(geometry, material);
    scene.add(heartMesh);

    function animate() {
        requestAnimationFrame(animate);
        heartMesh.rotation.y += 0.01;
        heartMesh.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        renderer.render(scene, camera);
    }
    animate();
}

/* REAL-TIME LOVE COUNTER TIMER (2026-yil 26-may, soat 19:00 dan boshlab aniq hisoblash) */
function startLoveCounter() {
    // 2026-yil 26-may, soat 19:00:00 ni boshlang'ich nuqta qilib belgilaymiz
    const startDate = new Date('2026-05-26T19:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return; // Agar vaqt hali kelmagan bo'lsa

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    setInterval(updateCounter, 1000);
    updateCounter();
}

/* MOOD SELECTOR LOGIC */
function selectMood(mood) {
    const box = document.getElementById('mood-response');
    box.classList.remove('hidden');
    
    let text = "";
    if (mood === 'happy') text = "😊 Quvonchingiz qalbimni nurga to'ldiradi. Hamma vaqt shunday kulib yuring!";
    if (mood === 'miss') text = "🥺 Men ham sizni har daqiqada va har bir soniyada juda qattiq sog'inyapman...";
    if (mood === 'tired') text = "😴 Ozgina dam oling, barcha tashvishlarni bir chetga suring. Men doim yoningizdaman.";
    if (mood === 'romantic') text = "💖 Siz mening bu hayotdagi eng go'zal va bebaho ne'matimsiz!";
    
    box.innerText = text;
    gsap.from(box, { opacity: 0, y: 10, duration: 0.3 });
}

/* MEMORY MAP DETAIL TOGGLE */
function showMapDetail(index) {
    const detail = document.getElementById(`map-detail-${index}`);
    if (detail.classList.contains('hidden')) {
        detail.classList.remove('hidden');
        gsap.from(detail, { opacity: 0, height: 0, duration: 0.3 });
    } else {
        detail.classList.add('hidden');
    }
}

/* LOVE QUIZ & COUPON */
function answerLoveQuiz(isCorrect) {
    if (isCorrect) {
        document.getElementById('love-quiz-box').classList.add('hidden');
        const coupon = document.getElementById('coupon-result');
        coupon.classList.remove('hidden');
        gsap.from(coupon, { scale: 0.8, opacity: 0, duration: 0.5 });
    } else {
        alert("Noto'g'ri javob, yana bir bor o'ylab ko'ring! 💖");
    }
}

/* ENVELOPE OPEN LOGIC */
function openEnvelope(card, index) {
    const content = card.querySelector('.env-content');
    const hint = card.querySelector('.env-hint');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (hint) hint.classList.add('hidden');
        gsap.from(content, { opacity: 0, y: 10, duration: 0.4 });
    } else {
        content.classList.add('hidden');
        if (hint) hint.classList.remove('hidden');
    }
}

/* MINI GAME LOGIC */
let score = 0;
let gameInterval;
const targetScore = 10;

function startGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('game-result').classList.add('hidden');
    const area = document.getElementById('game-area');
    area.innerHTML = '';
    gameInterval = setInterval(spawnHeart, 700);
}

function spawnHeart() {
    const area = document.getElementById('game-area');
    if (!area) return;

    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerText = ['💖', '💕', '🌸', '✨'][Math.floor(Math.random() * 4)];
    
    const randomX = Math.floor(Math.random() * (area.clientWidth - 35));
    const randomDuration = (Math.random() * 1.5 + 1.5).toFixed(2);

    heart.style.left = randomX + 'px';
    heart.style.animationDuration = randomDuration + 's';

    heart.onclick = function() {
        score++;
        document.getElementById('score').innerText = score;
        heart.remove();
        if (score >= targetScore) endGame();
    };

    setTimeout(() => { if (heart.parentNode === area) heart.remove(); }, randomDuration * 1000);
    area.appendChild(heart);
}

function endGame() {
    clearInterval(gameInterval);
    const area = document.getElementById('game-area');
    area.innerHTML = '<p style="color: #ff758c; font-weight: 600;">Barcha yurakchalar yig\'ildi! ✨</p>';
    document.getElementById('game-reward-text').innerText = "Siz dunyodagi eng epchil va eng go'zal insoonsiz! 💖";
    document.getElementById('game-result').classList.remove('hidden');
}

/* WISHING WELL */
function sendWish() {
    const input = document.getElementById('wish-input');
    const wishText = input.value.trim();
    if (!wishText) return;

    const wishList = document.getElementById('wish-list');
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.innerText = "🌟 Tilak: " + wishText;
    wishList.prepend(item);

    input.value = '';
    gsap.from(item, { scale: 0.8, opacity: 0, duration: 0.3 });
}

/* SECRET QUEST (EASTER EGGS) */
let unlockedEggs = [false, false, false];

function unlockEgg(index) {
    unlockedEggs[index - 1] = true;
    document.getElementById(`egg-${index}`).classList.add('active');
    
    if (unlockedEggs.every(status => status === true)) {
        document.getElementById('quest-reward').classList.remove('hidden');
        gsap.from('#quest-reward', { y: 20, opacity: 0, duration: 0.6 });
    }
}

/* AUDIO CONTROL */
function toggleAudio() {
    const music = document.getElementById('bg-music');
    const text = document.getElementById('music-text');
    if (music.paused) {
        music.play().then(() => {
            text.innerText = "Playing ♪";
        }).catch(() => {
            text.innerText = "Musiqani yoqish 🎼";
        });
    } else {
        music.pause();
        text.innerText = "Romantic Music";
    }
}
