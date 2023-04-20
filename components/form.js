class ContactForm extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
    <div class="modal hidden">
    <form action="" class="contact-form" id="contact-form">
      <button
        class="modal__close-btn btn-reset"
        aria-label="Close contact form"
      ></button>
      
        <input
          id="name"
          name="name"
          class="contact-form__input"
          type="text"
          placeholder="name"
          autocomplete="off"
        />

      <input
        id="email"
        name="email"
        class="contact-form__input"
        type="email"
        placeholder="email"
        autocomplete="off"
      />
      <textarea
        id="message"
        name="message"
        class="contact-form__textarea"
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
