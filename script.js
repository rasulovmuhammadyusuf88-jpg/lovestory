document.addEventListener('DOMContentLoaded', () => {
    startLoveCounter();
    initThreeHeart();
});

// 1. Taymer
function startLoveCounter() {
    const startDate = new Date('2026-05-26T19:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60) % 60));
        const seconds = Math.floor((diff / 1000) % 60);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCounter, 1000);
    updateCounter();
}

// 2. Bosqichlar va Parol
function nextStep(stepNumber) {
    document.querySelectorAll('.quiz-card').forEach(card => card.classList.add('hidden'));
    const nextCard = document.getElementById('step-' + stepNumber);
    if (nextCard) {
        nextCard.classList.remove('hidden');
    }
}

function checkPassword() {
    const passInput = document.getElementById('pass-input').value.trim();
    if (passInput !== "") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        alert("Iltimos, maxfiy kalitni kiriting! ✨");
    }
}

// 3. Musiqa
function toggleAudio() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    const text = document.getElementById('music-text');

    if (music.paused) {
        music.play();
        icon.innerText = "🎵";
        text.innerText = "O'ynalmoqda...";
    } else {
        music.pause();
        icon.innerText = "🎼";
        text.innerText = "To'xtatildi";
    }
}

// 4. Kayfiyat
function selectMood(mood) {
    const box = document.getElementById('mood-response');
    box.classList.remove('hidden');
    
    let text = "";
    if (mood === 'happy') text = "Tabassumingiz doim porlab tursin, dunyodagi eng go'zal kulgu sizga yarashadi! 😊";
    if (mood === 'miss') text = "Sizni juda ham sog'indim... Har soniya sizni o'ylayapman! 🥺💖";
    if (mood === 'tired') text = "Biroz dam oling, jigarim. Hammasi yaxshi bo'ladi, men doim yoningizdaman! ☕✨";
    if (mood === 'romantic') text = "Qalbim faqat siz bilan go'zal, sevgingiz bilan yashayapman! 🌹";

    box.innerHTML = `<p>${text}</p>`;
}

// 5. Konvertlar
function openEnvelope(element, num) {
    const content = element.querySelector('.env-content');
    const hint = element.querySelector('.env-hint');
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        hint.style.display = 'none';
    } else {
        content.classList.add('hidden');
        hint.style.display = 'block';
    }
}

// 6. Mini O'yin Kupon
function answerLoveQuiz(isCorrect) {
    const quizBox = document.getElementById('love-quiz-box');
    const coupon = document.getElementById('coupon-result');
    if (isCorrect) {
        quizBox.style.display = 'none';
        coupon.classList.remove('hidden');
    }
}

// 7. Tilaklar Qutisi
function sendWish() {
    const input = document.getElementById('wish-input');
    const list = document.getElementById('wish-list');
    if (input.value.trim() !== "") {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerText = "✨ " + input.value;
        list.prepend(div);
        input.value = "";
    }
}

// 8. 3D Yurak
function initThreeHeart() {
    const container = document.getElementById('three-heart-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7, x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 13, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 5, y, x + 5, y + 5, x + 5, y + 5 );

    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    const material = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3, metalness: 0.2 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.15, 0.15, 0.15);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(10, 10, 25);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}
