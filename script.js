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
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2f2e41);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  let geometry;
  const randomShape = Math.random();

  if (randomShape < 0.3) {
    geometry = new THREE.IcosahedronGeometry(1, 0);
  } else if (randomShape < 0.6) {
    geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
  } else {
    geometry = new THREE.OctahedronGeometry(1, 0);
  }

  const material = new THREE.MeshPhongMaterial({
    color: 0x6c63ff,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", function () {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });

  animate();
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
