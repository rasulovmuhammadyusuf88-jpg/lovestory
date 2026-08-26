document.addEventListener('DOMContentLoaded', () => {
    startLoveCounter();
    initThreeHeart();
});

// 1. O'TGAN VAQTNI HISOBLASH (Taymer)
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

// 2. BOSQICHLARNI ALMASHTIRISH VA YURAKCHALAR CHIQARISH
function nextStep(stepNumber, event) {
    if (event) {
        createFloatingHeart(event.clientX, event.clientY);
    }
    document.querySelectorAll('.quiz-card').forEach(card => card.classList.add('hidden'));
    const nextCard = document.getElementById('step-' + stepNumber);
    if (nextCard) {
        nextCard.classList.remove('hidden');
    }
}

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = (x ? x : window.innerWidth / 2) + 'px';
    heart.style.top = (y ? y : window.innerHeight / 2) + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.transition = 'transform 1s ease, opacity 1s ease';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translateY(-100px) scale(1.5)`;
        heart.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function wrongAnswer(event) {
    if (event) {
        createFloatingHeart(event.clientX, event.clientY);
    }
    alert("Biroz o'ylab ko'ring, to'g'ri javobni topasiz! 😉");
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

// 3. MUSIQANI YOQISH/O'CHIRISH
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

// 4. KAYFIYAT TUGMALARI
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

// 5. THREE.JS 3D YURAK ANIMATSIYASI (Kafolatlangan versiya)
function initThreeHeart() {
    const container = document.getElementById('three-heart-canvas');
    if (!container) return;

    // Sahna, kamera va render yaratish
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = ""; // Avvalgi canvas bo'lsa tozalash
    container.appendChild(renderer.domElement);

    // Yurak shaklini chizish
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

    // Yoritish
    const light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(10, 10, 25);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    camera.position.z = 5;

    // Aylanish animatsiyasi
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }
    animate();
}
