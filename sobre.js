// Toggle simples do menu mobile na página Sobre
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
	toggle.addEventListener('click', () => {
		const isOpen = nav.classList.toggle('open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});
}
