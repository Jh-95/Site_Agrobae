// Controle do menu mobile e rolagem suave na página de carreiras
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const jobsData = {
	'operador-colhedora': {
		title: 'Operador de Colhedora',
		location: 'Orlândia - SP',
		model: 'Presencial',
		summary: 'Atuar na operação de colhedora de cana garantindo segurança, qualidade do corte e melhor aproveitamento da operação no campo.',
		meta: 'Turno: Integral • Exige experiência prévia',
		responsibilities: [
			'Operar colhedora respeitando os procedimentos de segurança e produtividade.',
			'Realizar checklist diário do equipamento antes do início da jornada.',
			'Comunicar desvios operacionais e necessidades de manutenção ao líder.',
			'Manter padrão de qualidade na colheita e cuidado com o maquinário.'
		],
		requirements: [
			'Experiência com operação de colhedora de cana.',
			'Conhecimento básico de manutenção preventiva e inspeção.',
			'Disponibilidade para trabalho em turno integral.',
			'Compromisso com normas de segurança no campo.'
		],
		benefits: [
			'Vivência em operação com piloto automático.',
			'Treinamentos internos e capacitação contínua.',
			'Boa comunicação com equipe de frente de colheita.'
		]
	},
	'tecnico-seguranca': {
		title: 'Técnico de Segurança do Trabalho',
		location: 'Morro Agudo - SP',
		model: 'Presencial',
		summary: 'Conduzir ações de prevenção de acidentes, treinamentos e fiscalização para fortalecer a cultura de segurança nas operações agrícolas.',
		meta: 'Turno: Integral • NR vigentes',
		responsibilities: [
			'Realizar inspeções de segurança em campo e áreas de apoio.',
			'Aplicar treinamentos, diálogos de segurança e integração de novos colaboradores.',
			'Acompanhar indicadores, incidentes e planos de ação corretiva.',
			'Garantir o uso correto de EPI e o cumprimento das normas vigentes.'
		],
		requirements: [
			'Formação técnica em Segurança do Trabalho com registro ativo.',
			'Conhecimento atualizado das NRs aplicáveis ao agronegócio.',
			'Experiência com treinamentos e rotinas de prevenção.',
			'Disponibilidade para atuação presencial e deslocamentos locais.'
		],
		benefits: [
			'Experiência em ambiente agrícola ou industrial.',
			'Boa didática para treinamentos de equipes operacionais.',
			'Conhecimento em sistemas de gestão de segurança.'
		]
	},
	'auxiliar-administrativo': {
		title: 'Auxiliar Administrativo',
		location: 'Orlândia - SP',
		model: 'Híbrido',
		summary: 'Prestar suporte administrativo às áreas internas com organização de documentos, lançamentos e atendimento de demandas operacionais.',
		meta: 'Turno: Comercial • Pacote Office',
		responsibilities: [
			'Executar lançamentos e conferências de dados em planilhas e sistemas.',
			'Organizar arquivos, documentos e controles administrativos.',
			'Apoiar atendimento interno e fluxo de solicitações entre áreas.',
			'Atualizar relatórios e indicadores de acompanhamento.'
		],
		requirements: [
			'Ensino médio completo (superior em andamento será um diferencial).',
			'Domínio de Pacote Office, com foco em Excel.',
			'Organização, atenção aos detalhes e boa comunicação.',
			'Disponibilidade para rotina em horário comercial.'
		],
		benefits: [
			'Experiência anterior em rotinas administrativas.',
			'Noções de controle de documentos e indicadores.',
			'Facilidade com atendimento e trabalho em equipe.'
		]
	},
	'analista-agricola': {
		title: 'Analista Agrícola',
		location: 'Nova Crixás - GO',
		model: 'Presencial',
		summary: 'Planejar e acompanhar atividades agrícolas com foco em desempenho operacional, qualidade e otimização de recursos no campo.',
		meta: 'Turno: Integral • Experiência em soja/cana',
		responsibilities: [
			'Planejar e acompanhar tratos culturais, aplicação de insumos e cronogramas.',
			'Monitorar indicadores de produtividade e qualidade das operações.',
			'Gerar relatórios técnicos para suporte à tomada de decisão.',
			'Atuar em conjunto com equipes de campo para melhoria contínua.'
		],
		requirements: [
			'Formação em Agronomia, Engenharia Agrícola ou áreas correlatas.',
			'Experiência em operações com soja e/ou cana.',
			'Conhecimento de indicadores agrícolas e gestão de insumos.',
			'Disponibilidade para atuação presencial em Nova Crixás - GO.'
		],
		benefits: [
			'Vivência com agricultura de precisão.',
			'Capacidade analítica e boa comunicação com times de campo.',
			'Experiência com ferramentas de acompanhamento operacional.'
		]
	}
};

const jobCards = document.querySelectorAll('.job-card[data-job-id]');
const jobApplyTriggers = document.querySelectorAll('.job-card .job-apply');
const jobModal = document.getElementById('job-modal');
const closeModalControls = document.querySelectorAll('[data-close-modal]');
const jobModalTitle = document.getElementById('job-modal-title');
const jobModalLocation = document.getElementById('job-modal-location');
const jobModalModel = document.getElementById('job-modal-model');
const jobModalSummary = document.getElementById('job-modal-summary');
const jobModalMeta = document.getElementById('job-modal-meta');
const jobModalResponsibilities = document.getElementById('job-modal-responsibilities');
const jobModalRequirements = document.getElementById('job-modal-requirements');
const jobModalBenefits = document.getElementById('job-modal-benefits');
const jobModalApply = document.getElementById('job-modal-apply');
const applySelect = document.querySelector('select[name="vaga"]');

let lastFocusedCard = null;

function fillList(listElement, items) {
	if (!listElement) {
		return;
	}

	listElement.innerHTML = '';
	items.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = item;
		listElement.appendChild(li);
	});
}

function syncFormVacancy(title) {
	if (!applySelect) {
		return;
	}

	const option = Array.from(applySelect.options).find((item) => item.textContent.trim() === title);
	if (option) {
		applySelect.value = option.value || option.textContent;
	}
}

function openJobModal(jobId, card) {
	const job = jobsData[jobId];
	if (!job || !jobModal) {
		return;
	}

	jobModalTitle.textContent = job.title;
	jobModalLocation.textContent = job.location;
	jobModalModel.textContent = job.model;
	jobModalSummary.textContent = job.summary;
	jobModalMeta.textContent = job.meta;
	fillList(jobModalResponsibilities, job.responsibilities);
	fillList(jobModalRequirements, job.requirements);
	fillList(jobModalBenefits, job.benefits);
	syncFormVacancy(job.title);

	jobModal.classList.add('open');
	jobModal.setAttribute('aria-hidden', 'false');
	document.body.classList.add('modal-open');
	lastFocusedCard = card;
}

function closeJobModal() {
	if (!jobModal || !jobModal.classList.contains('open')) {
		return;
	}

	jobModal.classList.remove('open');
	jobModal.setAttribute('aria-hidden', 'true');
	document.body.classList.remove('modal-open');
	lastFocusedCard?.focus();
}

jobCards.forEach((card) => {
	card.addEventListener('click', (event) => {
		event.preventDefault();
		openJobModal(card.dataset.jobId, card);
	});

	card.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openJobModal(card.dataset.jobId, card);
		}
	});
});

jobApplyTriggers.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		const card = link.closest('.job-card');
		if (card) {
			openJobModal(card.dataset.jobId, card);
		}
	});
});

closeModalControls.forEach((control) => {
	control.addEventListener('click', closeJobModal);
});

if (jobModalApply) {
	jobModalApply.addEventListener('click', () => {
		closeJobModal();
	});
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeJobModal();
	}
});

if (toggle && nav) {
	toggle.addEventListener('click', () => {
		const isOpen = nav.classList.toggle('open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});
}

const ctaLinks = document.querySelectorAll('a[href^="#"]');
ctaLinks.forEach((link) => {
	// Scroll suave para as âncoras de vagas/formulário e fechamento do menu
	link.addEventListener('click', (event) => {
		if (event.defaultPrevented) {
			return;
		}

		const targetId = link.getAttribute('href');
		const target = document.querySelector(targetId);

		if (target) {
			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth' });
		}

		if (nav && nav.classList.contains('open')) {
			nav.classList.remove('open');
			toggle?.setAttribute('aria-expanded', 'false');
		}
	});
});
