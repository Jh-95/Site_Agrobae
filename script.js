// Navegação responsiva e rolagem suave da home
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('a[href^="#"]');

if (navToggle && nav) {
	// Alterna o menu mobile e atualiza atributo de acessibilidade
	navToggle.addEventListener('click', () => {
		const isOpen = nav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});
}

navLinks.forEach((link) => {
	// Scroll suave para âncoras e fechamento do menu mobile
	link.addEventListener('click', (event) => {
		const targetId = link.getAttribute('href');
		const target = document.querySelector(targetId);

		if (target) {
			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth' });
		}

		if (nav && nav.classList.contains('open')) {
			nav.classList.remove('open');
			navToggle?.setAttribute('aria-expanded', 'false');
		}
	});
});
