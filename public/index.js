const request = superagent;

const logInForm = document.querySelector('form');
const errorSpan = document.querySelector('#error-span');

logInForm.addEventListener('submit', async(e) => {
  e.preventDefault();

  const data = new FormData(logInForm);

  const user = {
    email: data.get('username-input'),
    password: data.get('password-input')
  };

  try {
    const response = await request
      .post('/api/v1/auth/login')
      .withCredentials()
      .send(user);
    
    if(response.statusCode === 200){

      if(user.password === 'adminPassword') {
        window.location.href = './updatePassword';
      } else {
        window.location.href = './admin/';
      }
    }
    
  } catch{
    errorSpan.textContent = 'Invalid Email or Password';
  }
});
