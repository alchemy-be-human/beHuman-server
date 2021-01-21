const request = superagent;

//TIPS SECTION
const tipList = document.querySelector('#tip-list');
const addTip = document.querySelector('#add-tip-form');

addTip.addEventListener('submit', async(e) => {
  e.preventDefault();
  const myForm = new FormData(addTip);
  const tip = myForm.get('add-tip-input');
  await request.post('/api/v1/tips')
    .set('Content-Type', 'application/json')
    .send({ tip });
  location.reload();
});

//Fetch and display Quick Tips with the ability to Update and Delete them
const getTips = async() => {
  const response = await request
    .get('/api/v1/tips');

  return response.body;
};

getTips()
  .then(allTips => {
    allTips.map(oneTip => {

      const displayCase = document.createElement('div');
      displayCase.classList.add('display-case');
      
      const tipContainer = document.createElement('div');
      tipContainer.classList.add('container');

      const displayTip = document.createElement('p');
      displayTip.textContent = oneTip.tip;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      tipContainer.append(displayTip, deleteButton);

      const editContainer = document.createElement('div');
      editContainer.classList.add('container');

      const editTip = document.createElement('input');
      editTip.name = 'edit-tip-input';
      editTip.value = oneTip.tip;
      editTip.classList.add('tipEdit');

      const editButton = document.createElement('button');

      editButton.textContent = 'Edit' + ' ' + oneTip.id;
    
      editContainer.append(editTip, editButton);
    
      displayCase.append(tipContainer, editContainer);
      tipList.append(displayCase);

      //Event listeners to delete and update tips
      deleteButton.addEventListener('click', async() => {
        const tipIdToDelete = oneTip.id;
        const alert = prompt('Type \'DELETE\' and click \'OK\' to continue with deleting this tip.');
        if(alert === 'DELETE'){
          await request.delete(`/api/v1/tips/${tipIdToDelete}`);
          location.reload();
        }
      });
    
      editButton.addEventListener('click', async() => {
        const tip = editTip.value;
        await request.put(`/api/v1/tips/${oneTip.id}`)
          .set('Content-Type', 'application/json')
          .send({ tip });
        location.reload();
      });
    });
  });

