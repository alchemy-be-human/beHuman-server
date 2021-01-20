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


//TIPS SECTION
const tipList = document.querySelector('#tip-list');
const addTip = document.querySelector('#add-tip-form');

addTip.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Add Tip button was clicked');
    
  // Add fetch call to POST/insert endpoint of tips.js
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
      editTip.value = oneTip.tip;

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit' + ' ' + oneTip.id;
    
      editContainer.append(editTip, editButton);

    
      displayCase.append(tipContainer, editContainer);
      tipList.append(displayCase);


      //Event listeners to delete and update tips
      deleteButton.addEventListener('click', () => {
        console.log(`Delete button clicked for Tip #${oneTip.id}`);

        // Make fetch call to DELETE endpoint of tips.js
      });
    
      editButton.addEventListener('click', () => {
        console.log(`Edit button clicked for Tip #${oneTip.id}`);

        // Make fetch call to PUT endpoint of tips.js
      });
    });
  });


  
// LINKS section
const linkList = document.querySelector('#link-list');
const addLink = document.querySelector('#add-link-form');

addLink.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Add Link button was clicked');

  // Add fetch call to POST/insert endpoint of links.js
});

//Fetch and display Quick Tips with the ability to Update and Delete them
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

      //Event listener to delete links
      deleteButton.addEventListener('click', () => {
        console.log(`Delete button clicked for Link #${oneLink.id}`);

        // Make fetchmcall to DELETE endpoint of links.js
      });
    });


  });
