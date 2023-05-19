document.addEventListener('DOMContentLoaded', () => {
	// sticky header
	const main = document.querySelector('.main');
	const header = document.querySelector('#header');

	const makeHeaderSticky = () => {
		let scrollTop = window.scrollY;
		let stickyStartPosition = header.offsetHeight;

		if (scrollTop >= stickyStartPosition) {
			header.classList.add('sticky');
			main.style.marginTop = `${header.offsetHeight}px`;
		} else {
			header.classList.remove('sticky');
			main.style.marginTop = `0px`;
		}
	};

	window.addEventListener(
		'scroll',
		() => {
			makeHeaderSticky();
		},
		false
	);
	// menu
	document.querySelector('#toggle-menu').addEventListener('click', function () {
		document.querySelector('.nav').classList.toggle('is-active');
	});
});
function toggleClass(i, targetEl, targetClass) {
	if (Array.isArray(targetEl)) {
		targetEl.forEach((btn) => {
			btn.classList.remove(targetClass);
		});
		targetEl[i].classList.add(targetClass);
	} else {
		targetEl.classList.add(targetClass);
		const siblings = getSiblings(targetEl);
		siblings.forEach((el) => el.classList.remove(targetClass));
	}
}
let getSiblings = function (e) {
	let siblings = [];
	if (!e.parentNode) {
		return siblings;
	}
	let sibling = e.parentNode.firstChild;
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== e) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};
// modal
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__close-btn');
const contactFormBtns = Array.from(document.querySelectorAll('.open-form'));
contactFormBtns.forEach((button) =>
	button.addEventListener('click', () => {
		modal.classList.remove('hidden');
	})
);
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
	if (e.target === modal) modal.classList.add('hidden');
});
// form
const inputs = Array.from(document.querySelectorAll('.contact-form__input'));
const form = document.querySelector('#contact-form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let errors = [];
	inputs.forEach((input) => {
		let error = showError(input);
		if (error) errors.push(error);
	});
	if (!errors.length) {
		sendMessage();
		modal.classList.add('hidden');
	}
});
// validate form
let hasError = false;
function showError(field) {
	const errorMessage = document.getElementById(`${field.id + '-error'}`);
	if (field.value.trim() === '') {
		field.classList.add('error');
		errorMessage.textContent = 'Field can not be empty';
		errorMessage.classList.add('active');
		return (hasError = true);
	} else if (field.validity.typeMismatch) {
		field.classList.add('error');
		errorMessage.textContent = 'Please enter a valid email address';
		errorMessage.classList.add('active');
		return (hasError = true);
	}
	return (hasError = false);
}
inputs.forEach((input) =>
	input.addEventListener('input', (e) => {
		const errorMessage = document.getElementById(`${input.id + '-error'}`);
		input.classList.remove('error');
		errorMessage.textContent = '';
		errorMessage.classList.remove('active');
	})
);
function sendMessage() {
	fetch('https://formsubmit.co/ajax/ardian.delton@fullangle.org', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			name: document.getElementById('name').value.trim(),
			email: document.getElementById('email').value.trim(),
			message: document.getElementById('message').value.trim(),
		}),
	})
		.then(async (response) => {
			const data = await response.json();
			if (!response.ok) {
				const error = data.error || response.status;
				return Promise.reject(error);
			}
			document
				.querySelector('.main')
				.append(showAlert('success', data.message));
		})
		.catch((error) => {
			console.error('There was an error!', error);
			document.querySelector('.main').append(showAlert('error', error));
		});
}
function showAlert(alertType, text) {
	const alert = document.createElement('div');
	alert.classList.add('alert', alertType);
	alert.innerHTML = `
	<h2 class="alert__heading">${
		alertType === 'success' ? 'Thank your for emailing us' : 'Error'
	}</h2>
	<p class="alert__text">
		${
			typeof text === 'string'
				? text.charAt(0).toUpperCase() + text.slice(1)
				: 'Network error'
		}
	</p>`;
	setTimeout(function () {
		alert.parentNode.removeChild(alert);
	}, 2000);
	return alert;
}
