// O código, no geral, precisa ser refatorado

const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

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
  if (confirm("Tem certeza que deseja excluir o contato?")) {
    const el = event.target.closest(".contact");
    const name = el.querySelector(".name").textContent;
    const telephone = el.querySelector(".telephone").textContent;
    const index = contacts.findIndex((contact) => (
      contact.name === name && contact.tel === telephone
    ));

    contacts.splice(index, 1);
    el.remove();

    updateLocalStorage();
  }
}

const updateLocalStorage = () => {
  if (contacts.length > 0) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

const editContact = (event) => {
  const contactEl = event.target.closest(".contact");
  const nameField = contactEl.querySelector(".name");
  const telephoneField = contactEl.querySelector(".telephone");

  const oldName = nameField.textContent;
  const oldTelephone = telephoneField.textContent;

  const newName = prompt("Novo nome:", oldName);
  const newTelephone = prompt("Novo telefone", oldTelephone);

  nameField.textContent = newName.trim() || oldName;
  telephoneField.textContent = newTelephone.trim() || oldTelephone;
}

contactsEl.addEventListener("click", (event) => {
  const el = event.target;

  if (el.classList.contains("edit-button")) {
    editContact(event);
  }

  if (el.classList.contains("delete-button")) {
    removeContact(event);
  }
});

addContactButton.addEventListener("click", () => {
  const nameInput = document.querySelector("#name-input");
  const telephoneInput = document.querySelector("#telephone-input");
  const name = nameInput.value.trim();
  const telephone = telephoneInput.value.trim();
  
  try {
    if (name && telephone) {
      nameInput.value = "";
      telephoneInput.value = "";
      nameInput.focus();
    
      addContact(createContact(name, telephone));
      contacts.push({ name: name, tel: telephone });
      updateLocalStorage();
    } else {
      throw new Error("Campo(s) de entrada não preenchido(s) ou com valor(es) inválido(s)");
    }
  } catch (error) {
    if (!name && !telephone) {
      alert("Informe o nome e telefone");
  
    } else {
      !name && alert("Informe o nome");
      !telephone && alert("Informe o telefone");
    }

    console.error(error);
  }
});

window.addEventListener("load", () => {
  if (contacts.length > 0) {
    contacts.forEach((contact) => {
      addContact(createContact(contact.name, contact.tel));
    })
  }
});