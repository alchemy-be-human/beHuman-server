const request = superagent;

const updateForm = document.querySelector('#updateForm');
const errorSpan = document.querySelector('#error-span');

updateForm.addEventListener('submit', async(e) => {
  e.preventDefault();

  const formData = new FormData(updateForm);

  const userPass = {
    email: formData.get('email-input'),
    password: formData.get('new-password-input'),
  };

  try {
    await request
      .put('/api/v1/auth/updatePassword')
      .withCredentials()
      .send(userPass);
    window.location.href = '/login';
      
  } catch{
    errorSpan.textContent = 'Invalid Email';
  }

});
