// Navegação responsiva e rolagem suave da home com React + fallback vanilla
function initHomeVanilla() {
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.nav');
	const navLinks = document.querySelectorAll('a[href^="#"]');

	if (navToggle && nav) {
		navToggle.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});
	}

	navLinks.forEach((link) => {
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
}

function initHomeReact() {
	if (!window.React || !window.ReactDOM) {
		initHomeVanilla();
		return;
	}

	const React = window.React;
	const { useEffect, useState } = React;
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.nav');
	const navLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

	if (!navToggle || !nav) {
		return;
	}

	const rootElement = document.createElement('div');
	rootElement.id = 'react-home-controller';
	rootElement.style.display = 'none';
	document.body.appendChild(rootElement);

	function HomeController() {
		const [isOpen, setIsOpen] = useState(false);

		useEffect(() => {
			nav.classList.toggle('open', isOpen);
			navToggle.setAttribute('aria-expanded', String(isOpen));
		}, [isOpen]);

		useEffect(() => {
			const handleToggle = () => setIsOpen((prev) => !prev);
			navToggle.addEventListener('click', handleToggle);

			const cleanupFns = navLinks.map((link) => {
				const handler = (event) => {
					const targetId = link.getAttribute('href');
					const target = targetId ? document.querySelector(targetId) : null;

					if (target) {
						event.preventDefault();
						target.scrollIntoView({ behavior: 'smooth' });
					}

					if (isOpen) {
						setIsOpen(false);
					}
				};

				link.addEventListener('click', handler);
				return () => link.removeEventListener('click', handler);
			});

			return () => {
				navToggle.removeEventListener('click', handleToggle);
				cleanupFns.forEach((cleanup) => cleanup());
			};
		}, [isOpen]);

		return null;
	}

	window.ReactDOM.createRoot(rootElement).render(React.createElement(HomeController));
}

initHomeReact();
