/* =========================================================
   SCRIPT.JS - Zavira Haramain
   JavaScript sederhana untuk interaksi halaman

   Dibuat tanpa library eksternal (vanilla JavaScript)
   Cocok untuk dipelajari pemula
   ========================================================= */

/* =========================================================
   1. HAMBURGER MENU - Menu mobile
   Membuka dan menutup menu saat tombol hamburger diklik
   ========================================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    // Toggle class 'active' dan 'open' untuk animasi dan tampilan menu
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Tutup menu saat salah satu link diklik
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

/* =========================================================
   2. NAVBAR SCROLL EFFECT
   Menambahkan bayangan navbar saat halaman discroll
   ========================================================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =========================================================
   3. SMOOTH SCROLL
   Scroll halus saat link anchor diklik (misal: href="#fitur")
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Cegah lompat langsung

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Hitung posisi dengan memperhitungkan tinggi navbar
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' // Scroll halus
      });
    }
  });
});

/* =========================================================
   4. ANIMASI SCROLL (Intersection Observer)
   Elemen akan muncul dengan efek fade-in saat discroll ke bawah
   ========================================================= */
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Intersection Observer mengamati kapan elemen masuk ke layar
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Tambah class 'visible' saat elemen terlihat di layar
        entry.target.classList.add('visible');
        // Hentikan pengamatan setelah animasi selesai
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1, // Animasi mulai saat 10% elemen terlihat
    rootMargin: '0px 0px -50px 0px'
  }
);

// Daftarkan semua elemen yang perlu dianimasi
animatedElements.forEach(function (el) {
  observer.observe(el);
});

/* =========================================================
   5. FALLBACK GAMBAR YANG GAGAL DIMUAT
   Jika gambar tidak bisa dimuat, tampilkan placeholder
   ========================================================= */
function handleImageError(img) {
  // Cek apakah img adalah elemen foto profil tim
  if (img.classList.contains('tim-photo')) {
    // Ganti dengan div fallback emoji
    const fallback = document.createElement('div');
    fallback.className = 'tim-photo-fallback';
    fallback.textContent = '👤';
    img.parentNode.replaceChild(fallback, img);
  } else {
    // Untuk gambar lainnya, tampilkan teks fallback
    const fallback = document.createElement('div');
    fallback.className = 'img-fallback';
    fallback.innerHTML = '<span>Gambar belum ditambahkan</span>';
    img.parentNode.replaceChild(fallback, img);
  }
}

// Pasang event error pada semua gambar di halaman
document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('error', function () {
    handleImageError(this);
  });
});

/* =========================================================
   CATATAN UNTUK MAHASISWA:
   - Fungsi di atas sudah cukup untuk landing page sederhana
   - Jangan ubah fungsi observer (Intersection Observer) karena
     berkaitan dengan animasi scroll
   - Jika ingin menambah fitur, tambahkan di bawah komentar ini
   ========================================================= */