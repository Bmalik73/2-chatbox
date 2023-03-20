//CHATBOX

//Content Loaded
window.addEventListener("DOMContentLoaded", (e) => {
  
  const headers = document.querySelectorAll(".header");
  let chatRooms = document.querySelectorAll(".chat-room");
  const typeAreas = document.querySelectorAll(".type-area");
  const inputMessages = document.querySelectorAll("#inputMessage1 ,#inputMessage2");
  const btnSends = document.querySelectorAll(".button-send");
  let messages = document.querySelectorAll(".message");
  let messagesRight = document.querySelectorAll(".message-right");
  const btnClose = document.querySelector(".btn-close");
  const btnEdit = document.querySelector(".btn-edit");
  const btnDelete = document.querySelector(".btn-delete");
  const modal = document.querySelector(".modal");
  let previousContentMessageActive = "";

  
    const handleMessage = (message) => {
      modal.classList.remove('d-none');
      console.log("message",message);
      message.classList.add('active');
    }

    const handleEditDeleteMessage = () => {
      messagesRight.forEach(messageRight => messageRight.addEventListener("dblclick", () => handleMessage(messageRight)));
    };

  //Header onclick event
    headers.forEach((header, index) => {
    header.addEventListener("click", (e) => {
      typeAreas[index].classList.toggle("d-none");
      chatRooms[index].classList.toggle("d-none");
    });
  });
  
  //Button Send onclick event
    btnSends.forEach((btnSend, index) => {
    btnSend.addEventListener("click", (e) => {
      
      let idMessage = `id-${new Date().getTime()}`;
      chatRooms[index].innerHTML += `<div class="message message-right ${idMessage}">
      <div class="avatar-wrapper avatar-small">
      <img src="./assets/images/avatar${index+1}.jpg" alt="avatar" />
      </div>
      <div class="bubble">
      ${inputMessages[index].value}
      </div>
      </div>`;
      if (index == 0) {
        chatRooms[1].innerHTML += `<div class="message message-left ${idMessage}">
        <div class="avatar-wrapper avatar-small">
        <img src="./assets/images/avatar1.jpg" alt="avatar" />
        </div>
        <div class="bubble">
        ${inputMessages[index].value}
        </div>
        </div>`;
      }
      else {
        chatRooms[0].innerHTML += `<div class="message message-left ${idMessage}">
        <div class="avatar-wrapper avatar-small">
        <img src="./assets/images/avatar2.jpg" alt="avatar" />
        </div>
        <div class="bubble">
        ${inputMessages[index].value}
        </div>
        </div>`; 
      }    
    // raffraichie les elements chatroom
      chatRooms = document.querySelectorAll(".chat-room");

      if (index == 0){
        chatRooms[0].lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
        setTimeout(() => {
          chatRooms[1].lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
        }, 1000);
      } else {
        chatRooms[1].lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
        setTimeout(() => {
          chatRooms[0].lastChild.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
        }, 1000);
      }
      
    // Rafraichissement des messages
        messagesRight = document.querySelectorAll(".message-right");
        handleEditDeleteMessage();
      });
    });
    
      btnClose.addEventListener("click", (e) =>{
        modal.classList.add("d-none")
      });
      btnEdit.addEventListener("click", (e) =>{
        const messageActive = document.querySelector(".message-right.active");     
        console.log("childnode", messageActive.childNodes[3]); 
        let contentMessageElement = messageActive.childNodes[3]
        previousContentMessageActive = contentMessageElement.textContent;
        contentMessageElement.setAttribute("contenteditable","true");
        modal.classList.add("d-none")
        contentMessageElement.focus();
        contentMessageElement.addEventListener("focusout", () => {
          contentMessageElement.setAttribute("contenteditable","false");
          let newContentMessageActive = contentMessageElement.textContent.trim();
          messageActive.classList.remove("active")
          let classMessageActive = messageActive.className;
          let idMessageActive = classMessageActive.slice(-16);
          let messagesEdit = document.querySelectorAll(`.${idMessageActive} .bubble`);    /// ${nomVariable}
          messagesEdit.forEach(messageEdit => (messageEdit.innerText = newContentMessageActive));

        })

  });
  btnDelete.addEventListener("click", (e) =>{
  const messageActive = document.querySelector(".message.active");
  messageActive.remove();
  modal.classList.add('d-none');

  });
   
  
});

  