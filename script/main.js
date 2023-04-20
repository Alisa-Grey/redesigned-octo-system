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
// form
const form = document.querySelector('#contact-form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	modal.classList.add('hidden');
});
