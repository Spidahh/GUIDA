
function changeContent(pageName) {
    // Nascondi tutte le sezioni
    document.querySelectorAll('.content section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostra la sezione corrispondente
    const targetSection = document.getElementById(pageName);
    if (targetSection) {
        targetSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateActiveMenuItem(pageName);
        updateHorizontalMenu(pageName);

    const menu = document.querySelector('.menu');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    }

    }
}

function updateActiveMenuItem(pageName) {
    document.querySelectorAll('.menu li').forEach(li => {
        li.classList.remove('active');
    });
    const activeItem = document.querySelector(`.menu li[onclick="changeContent('${pageName}')"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function updateHorizontalMenu(pageName) {
    const horizontalMenu = document.querySelector('.horizontal-menu ul');
    horizontalMenu.innerHTML = '';
    const section = document.getElementById(pageName);
    if (!section) return;
    const headings = section.querySelectorAll('h2');
    headings.forEach(heading => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        li.appendChild(a);
        horizontalMenu.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Imposta la sezione iniziale visibile
    changeContent('home');

    // Pulsante "Torna su"
    const scrollBtn = document.getElementById("scrollToTop");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


function toggleMenu() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}


// --- SCROLL TO TOP ---
const scrollBtn = document.getElementById("scrollToTop");
if (scrollBtn) {
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- TOGGLE SUBMENU COMPORTAMENTO PERSISTENTE SU CLICK SOLO PRINCIPALE ---
document.querySelectorAll("li.grosso").forEach(item => {
    item.addEventListener("click", (e) => {
        // Evita di chiudere se si clicca su un elemento interno (sottovoce)
        if (e.target !== item) return;

        document.querySelectorAll("ul.submenu").forEach(sub => {
            if (sub !== item.querySelector("ul.submenu")) {
                sub.style.display = "none";
            }
        });
        let submenu = item.querySelector("ul.submenu");
        if (submenu) {
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        }
    });
});
