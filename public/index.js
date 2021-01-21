const request = superagent;

const logInForm = document.querySelector('form');

logInForm.addEventListener('submit', async(e) => {
  e.preventDefault();

  const data = new FormData(logInForm);

  const user = {
    email: data.get('username-input'),
    password: data.get('password-input')
  };

  const response = await request
    .post('/api/v1/auth/login')
    .send(user);
  
  console.log(response);
  
  if(response.statusCode === 200) {
    window.location.href = './admin/';
  }

});
