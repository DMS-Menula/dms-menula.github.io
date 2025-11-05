document.addEventListener("DOMContentLoaded", function () {
  if (typeof THREE !== "undefined") {
    initThreeJS();
  } else {
    console.log("Three.js not loaded, using fallback animation");
    initFallbackAnimation();
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  window.onscroll = function () {
    toggleTopButton();
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTopButton() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("back-to-top").classList.remove("d-none");
    } else {
      document.getElementById("back-to-top").classList.add("d-none");
    }
  }

  // Alternative event listener (not needed if using onclick)
  document
    .getElementById("back-to-top")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-dark");
      navbar.classList.add("shadow");
    } else {
      navbar.classList.remove("bg-dark");
      navbar.classList.remove("shadow");
    }
  });

  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".skill-card, .project-card, .timeline-content"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  document
    .querySelectorAll(".skill-card, .project-card, .timeline-content")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;

    shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
});

function initThreeJS() {
  const container = document.getElementById("canvas-container");
  if (!container) return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1500;
            
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
                
                if (i % 3 === 0) {
                    colorArray[i] = Math.random() * 0.5 + 0.5; // Blue
                } else if (i % 3 === 1) {
                    colorArray[i] = Math.random() * 0.3 + 0.3; // Green
                } else {
                    colorArray[i] = Math.random() * 0.5 + 0.5; // Purple
                }
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            // Mesh
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.3
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(sphere);
            
            camera.position.z = 3;
            
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - window.innerWidth / 2) / 100;
                mouseY = (event.clientY - window.innerHeight / 2) / 100;
            });
            
            function animate() {
                requestAnimationFrame(animate);
                
                particlesMesh.rotation.x += 0.001;
                particlesMesh.rotation.y += 0.002;
                sphere.rotation.x += 0.005;
                sphere.rotation.y += 0.003;
                
                particlesMesh.rotation.y += mouseX * 0.0005;
                particlesMesh.rotation.x += mouseY * 0.0005;
                
                sphere.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.2;
                sphere.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.2;
                sphere.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.2;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
}

function initFallbackAnimation() {
  const container = document.getElementById("canvas-container");
  container.style.background =
    "linear-gradient(135deg, #2F2E41 0%, #4D44DB 100%)";

  for (let i = 0; i < 10; i++) {
    const shape = document.createElement("div");
    shape.className = "fallback-shape";
    shape.style.width = `${10 + Math.random() * 30}px`;
    shape.style.height = shape.style.width;
    shape.style.background = "rgba(108, 99, 255, 0.5)";
    shape.style.borderRadius = "50%";
    shape.style.position = "absolute";
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${Math.random() * 100}%`;
    shape.style.opacity = "0.3";

    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 5;
    shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(shape);
  }
}


const cursorRing = document.createElement("div");
cursorRing.classList.add("cursor-ring");
document.body.appendChild(cursorRing);

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
const speed = 0.15; 

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  ringX += (mouseX - ringX) * speed;
  ringY += (mouseY - ringY) * speed;

  cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

  requestAnimationFrame(animate);
}
animate();

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorRing.style.width = "50px";
    cursorRing.style.height = "50px";
    cursorRing.style.borderColor = "#0f52ba";
  });
  el.addEventListener("mouseleave", () => {
    cursorRing.style.width = "36px";
    cursorRing.style.height = "36px";
    cursorRing.style.borderColor = "#bfa17f";
  });
});
