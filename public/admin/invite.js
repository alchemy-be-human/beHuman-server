const request = superagent;

const inviteForm = document.querySelector('#invite-form');

inviteForm.addEventListener('submit', async(e) => {
  e.preventDefault();

  const data = new FormData(inviteForm);

  const invite = {
    email: data.get('email-input'),
  };

  await request
    .post('/api/v1/auth/invite')
    .send(invite);
});
