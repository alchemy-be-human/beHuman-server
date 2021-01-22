const request = superagent;

const inviteForm = document.querySelector('#invite-form');
const inviteInput = document.querySelector('#invite-input');

inviteForm.addEventListener('submit', async(e) => {
  e.preventDefault();

  const data = new FormData(inviteForm);

  const invite = {
    email: data.get('email-input'),
  };

  inviteInput.value = '';

  await request
    .post('/api/v1/auth/invite')
    .send(invite);
});
