const contactsEl = document.querySelector("#contacts");
const addContactButton = document.querySelector("#add-contact-button");

const createContact = (name, telephone) => {
  const contact = `
    <div class="contact">
      <div class="name">${name}</div>
      <div class="telephone">${telephone}</div>
      <div class="buttons-wrapper">
        <button type="button" class="edit-button">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" class="delete-button">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>`;
  
  return contact;
}

const addContact = (contact) => {
  const contacts = document.querySelector("#contacts");

  contacts.innerHTML += contact;
}

const removeContact = (event) => {
  const el = event.target.closest(".contact");

  el.remove();
}

const editContact = (event) => {
  console.log(event);
}

contactsEl.addEventListener("click", (event) => {
  const el = event.target;

  if (el.classList.contains("edit-button")) {
    editContact(event);
  }

  if (el.classList.contains("delete-button")) {
    removeContact(event);
  }
})

addContactButton.addEventListener("click", () => {
  const nameInput = document.querySelector("#name-input");
  const telephoneInput = document.querySelector("#telephone-input");
  const name = nameInput.value;
  const telephone = telephoneInput.value;

  nameInput.value = "";
  telephoneInput.value = "";
  nameInput.focus();

  addContact(createContact(name, telephone));
})