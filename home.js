  const counters = document.querySelectorAll('.count');
  let started = false;

  function countUp() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 80;
      const update = () => {
        const value = +counter.innerText;
        const increment = target / speed;
        if (value < target) {
          counter.innerText = Math.ceil(value + increment);
          setTimeout(update, 20);
        } else {
          counter.innerText = target + "+";
        }
      };
      update();
    });
  }

  window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if (!section) return;  // ✅ prevent null error
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (!started && sectionTop < windowHeight - 100) {
      started = true;
      countUp();
    }
  });

//   document.addEventListener('DOMContentLoaded', function() {
//     // 1. Ellaa navigation links-ayum edukkiradhu
//     const navbarLinks = document.querySelectorAll('.navbar a');
    
//     // 2. Current page URL path-a edukkiradhu (e.g., 'home.html', 'cars.html')
//     // window.location.pathname will give something like '/127.0.0.1:5500/car.html'
//     // .pop() will extract the filename (e.g., 'car.html')
//     const currentPath = window.location.pathname.split('/').pop();

//     navbarLinks.forEach(link => {
//         // First, irukura 'active' class-a ellathulaiyum remove pannirunga
//         link.classList.remove('active');

//         // Link-oda href (e.g., 'cars.html') edukkiradhu
//         const linkPath = link.href.split('/').pop();
        
//         // Match condition:
//         // Unga browser local-la run aagumbodhu currentPath empty-a irundha (like just 127.0.0.1:5500/),
//         // adhai Home nu consider pannaam.
//         const isHomePage = (currentPath === '' || currentPath === 'index.html');
        
//         if (
//             linkPath === currentPath || // Example: linkPath is 'cars.html' and currentPath is 'cars.html'
//             (isHomePage && linkPath.includes('home')) // Home page-a irundha, Home link-a active pannaam
//         ) {
//             // Match aana link-ku mattum 'active' class-a add panraam
//             link.classList.add('active');
//         }
//     });
// });