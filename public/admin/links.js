const request = superagent;

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
