class ContactForm extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
    <div class="modal hidden">
    // <form action="https://formsubmit.co/your@email.com" method="POST" class="contact-form" id="contact-form" novalidate>
    <form action="" class="contact-form" id="contact-form" novalidate>
      <button
        class="modal__close-btn btn-reset"
        aria-label="Close contact form"
      ></button>
        <input type="hidden" name="_subject" value="New submission from company website">
        <span class="tooltiptext" id="name-error"></span>
        <input
          id="name"
          name="name"
          class="contact-form__input"
          type="text"
          placeholder="name"
          autocomplete="off"
        />
        <span class="tooltiptext" id="email-error"></span>
      <input
        id="email"
        name="email"
        class="contact-form__input"
        type="email"
        placeholder="email"
        autocomplete="off"
      />
      <span class="tooltiptext" id="message-error"></span>
      <textarea
        id="message"
        name="message"
        class="contact-form__input contact-form__textarea"
        placeholder="message"
        autocomplete="off"
      ></textarea>
      <button type="submit" class="contact-form__btn link--filled btn-reset">
        Submit
      </button>
    </form>
  </div>
    `;
	}
}

customElements.define('contact-form', ContactForm);
