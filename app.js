// ====== Basic Three.js Setup (Initialize Scene, Camera, and Renderer) ======
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// ====== Heart Equation Vertices (Data Points) ======
const vertices = [];
const numPoints = 60000;

for (let i = 0; i < numPoints; i++) {
    const t = i * (Math.PI / 180) * 0.1;
    
    // Parametric equation for the X and Y coordinates of the heart
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    // Z coordinate for a slight 3D depth/scatter effect
    const z = (Math.random() - 0.5) * 0.5;
    
    // Scale the heart down by multiplying with 0.15
    vertices.push(x * 0.15, y * 0.15, z); 
}

// ====== Particles and Material Setup ======
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
    // تم تغيير اللون إلى البني الداكن: 0x5C4033
    color: 0x5C4033, 
    // يمكن تجربة إزالة AdditiveBlending للحصول على لون أقل توهجاً
    blending: THREE.AdditiveBlending, 
    size: 0.08 // زيادة الحجم قليلاً لجعل اللون أكثر وضوحاً
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ====== GSAP Animation (Scene Rotation) ======
gsap.fromTo(scene.rotation, {y: -0.2}, {
    y: 0.2, 
    repeat: -1, 
    yoyo: true, 
    ease: 'power2.inOut',
    duration: 3
});

// ====== Render Loop (Keeps the Animation Running) ======
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();