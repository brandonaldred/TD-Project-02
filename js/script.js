/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Made a var of number of elements to show. Could have a drop down to show more, less or all elements.
const numToShow = 9;
const currentPage = 1;


//Getting elements where the student list and link list will live, to insert new HTML into.
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');

//Function to build out HTML elements. Pass in the type of element to be created and an object literal of the attributes/values.
function buildElements(type,obj) {
   const element = document.createElement(type);
   for (let prop in obj) {
      element[prop] = obj[prop];
   }
   return element;
}

//Function to append items. Pass in the parent item along with an array of siblings that need to be appeneded.
function appendChild (parent,siblings) {
   for (let i = 0; i < siblings.length; i++) {
      parent.appendChild(siblings[i]);
   }
}

//Creating Search Bar (Not Using. Need to build out the logic)
/*const insertSearch = document.querySelector('.header');
const label = buildElements('LABEL', {htmlFor: 'search', className: 'student-search'});
const searchSpan = buildElements('SPAN',{textContent: 'Search by Name'});
const searchInput = buildElements('INPUT', {id: 'search', placeholder: 'Search by name...'});
const searchButton = buildElements('BUTTON', {type: 'button'});
const searchImg = buildElements('IMG',{src: 'img/icn-search.svg', alt: 'Search Icon'});

appendChild(searchButton,[searchImg]);
appendChild(label,[searchSpan,searchInput,searchButton]);
appendChild(insertSearch,[label]);
*/

//Build the card for the student data.
function createCard(url, firstName, lastName, userEmail, joinDate) {
   //Creating all the elements to build a complete card of student details.
   const li = buildElements('LI',{className: 'student-item cf'});
   const studentDetails = buildElements('DIV', {className: 'student-details'});
   const avatar = buildElements('IMG',{className: 'avatar', src: url, alt: `${firstName} ${lastName} profile picture`});
   const h3 = buildElements('H3',{textContent: `${firstName} ${lastName}`});
   const email = buildElements('SPAN', {className: 'email', textContent: userEmail});
   const joinDetails = buildElements('DIV', {className: 'joined-details'});
   const date = buildElements('SPAN',{className: 'date', textContent: joinDate});
   //Appending all the items to complete the card.
   appendChild(studentDetails,[avatar,h3,email]);
   appendChild(joinDetails,[date]);
   appendChild(li,[studentDetails,joinDetails]);
   appendChild(studentList,[li]);
}

//build out pagination elements 
function addPagination(page, data, numToShow) {
   //Quick math to know how many pages the document needs.
   const numPages = Math.ceil(data.length / numToShow);
   //If number of pages is greater than one, show the pagination buttons.
   if (numPages > 1) {
      for (let i = 1; i <= numPages; i++) {
         const li = document.createElement('LI');
         const button = buildElements('BUTTON', {type: 'button', textContent: i});
         if (page == i) {
            button.className = 'active';
         }
         li.appendChild(button);
         linkList.appendChild(li);
      }
   }
}

//Build out the actual page with the correct number of elements.
function buildPage(numToShow, pageNum, studentData) {
   //Use page number to determine where in the data object the information should be pulled from.
   const start = (pageNum - 1) * numToShow;
   //Created a seperate array of objects to slice and dice. Not sure if this is the best approach.
   const pageData = studentData;
   //Slice the array pulling only the necessary information to build out the page.
   const toShow = pageData.slice(start, start + numToShow);
   for (let i = 0; i < toShow.length; i++) {
      let currentStudent = toShow[i];
      createCard(currentStudent.picture.large,
         currentStudent.name.first,
         currentStudent.name.last,
         currentStudent.email,
         currentStudent.registered.date);
   }
   //Add the pagination to the bottom of the page based on the information passed to the function.
   addPagination(pageNum, studentData, numToShow);
}

//build out the page with default values
buildPage(numToShow, currentPage, data);


//Add event listeners on the pagination items.
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      //Need to clear out the previous cards that were showing as you click through pages
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      //Call the function to build page and add pagination with correct class depending on what page you're viewing.
      buildPage(numToShow, e.target.textContent, data);
   }
});