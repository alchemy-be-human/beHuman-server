const request = superagent;

// INVITE SECTION
const inviteForm = document.querySelector('#invite-form');

inviteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log('Invite form was clicked.');

  const data = new FormData(inviteForm);

  const invite = {
    email: data.get('email-input'),
  };
  console.log(invite);

  //send form data to backend below here with POST/fetch call
});
