const request = superagent;

const linkList = document.querySelector('#link-list');
const addLink = document.querySelector('#add-link-form');

// const response = 

request
  .get('/api/v1/auth/verify')
  .then(response => {
    console.log(response.body);
    if(response.statusCode === 401) {
      window.location = '../index.html';
    }
  });


//Insert new link into database
addLink.addEventListener('submit', async(e) => {
  e.preventDefault();
  const inputLink = document.getElementById('link-input').value;
  if(!inputLink) return;
  await request.post('/api/v1/links')
    .send({ url: inputLink });
  location.reload();
});

//Fetch and display Links with the ability to Delete them
const getLinks = async() => {
  const response = await request
    .get('/api/v1/links');

  return response.body;
};

getLinks()
  .then(allLinks => {
    allLinks.map(oneLink => {

      const linkContainer = document.createElement('div');
      linkContainer.classList.add('display-case');
      linkContainer.textContent = oneLink.url;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      linkContainer.append(deleteButton);
      linkList.append(linkContainer);

      //Delete link from database
      deleteButton.addEventListener('click', async() => {
        const linkIdToDelete = oneLink.id;
        const alert = prompt('Type \'DELETE\' and click \'OK\' to continue with deleting this link.');

        if(alert === 'DELETE'){
          await request.delete(`/api/v1/links/${linkIdToDelete}`);
          location.reload();
        }
      });
    });
  });
