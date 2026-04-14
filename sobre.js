// Toggle de menu da página Sobre com React + fallback vanilla
function initSobreVanilla() {
	const toggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.nav');

	if (toggle && nav) {
		toggle.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded', String(isOpen));
		});
	}
}

function initSobreReact() {
	if (!window.React || !window.ReactDOM) {
		initSobreVanilla();
		return;
	}

	const React = window.React;
	const { useEffect, useState } = React;
	const toggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.nav');

	if (!toggle || !nav) {
		return;
	}

	const rootElement = document.createElement('div');
	rootElement.id = 'react-sobre-controller';
	rootElement.style.display = 'none';
	document.body.appendChild(rootElement);

	function SobreController() {
		const [isOpen, setIsOpen] = useState(false);

		useEffect(() => {
			nav.classList.toggle('open', isOpen);
			toggle.setAttribute('aria-expanded', String(isOpen));
		}, [isOpen]);

		useEffect(() => {
			const handleToggle = () => setIsOpen((prev) => !prev);
			toggle.addEventListener('click', handleToggle);
			return () => toggle.removeEventListener('click', handleToggle);
		}, []);

		return null;
	}

	window.ReactDOM.createRoot(rootElement).render(React.createElement(SobreController));
}

initSobreReact();
