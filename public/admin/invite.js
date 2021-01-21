const request = superagent;

// INVITE SECTION
const inviteForm = document.querySelector('#invite-form');

inviteForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  console.log('Invite form was clicked.');

  const data = new FormData(inviteForm);

  const invite = {
    email: data.get('email-input'),
  };
  console.log(invite);

  //send form data to backend below here with POST/fetch call

  await request
    .post('/api/v1/auth/invite')
    .send(invite)
    .then(console.log('Made it here.'));

});
