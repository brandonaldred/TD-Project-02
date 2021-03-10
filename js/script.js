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

function buildElements(type,obj) {
   const element = document.createElement(type);
   for (let prop in obj) {
      element[prop] = obj[prop];
   }
   return element;
}

//Creating Search Bar
const insertSearch = document.querySelector('.header');
const label = buildElements('LABEL', {htmlFor: 'search', className: 'student-search'});
const searchSpan = buildElements('SPAN',{textContent: 'Search by Name'});
const searchInput = buildElements('INPUT', {id: 'search', placeholder: 'Search by name...'});
const searchButton = buildElements('BUTTON', {type: 'button'});
const searchImg = buildElements('IMG',{src: 'img/icn-search.svg', alt: 'Search Icon'});

searchButton.appendChild(searchImg);
label.appendChild(searchSpan);
label.appendChild(searchInput);
label.appendChild(searchButton);
insertSearch.appendChild(label);

//Build out a list of students
function createCard(url, firstName, lastName, userEmail, joinDate) {
   const li = buildElements('LI',{className: 'student-item cf'});
   const studentDetails = buildElements('DIV', {className: 'student-details'});
   const avatar = buildElements('IMG',{className: 'avatar', src: url, alt: `${firstName} ${lastName} profile picture`});
   const h3 = buildElements('H3',{textContent: `${firstName} ${lastName}`});
   const email = buildElements('SPAN', {className: 'email', textContent: userEmail});
   const joinDetails = buildElements('DIV', {className: 'joined-details'});
   const date = buildElements('SPAN',{className: 'date', textContent: joinDate});
   
   studentDetails.appendChild(avatar);
   studentDetails.appendChild(h3);
   studentDetails.appendChild(email);
   joinDetails.appendChild(date);
   li.appendChild(studentDetails);
   li.appendChild(joinDetails);
   studentList.appendChild(li);
}

//build out pagination elements 
function addPagination(page, data, numToShow) {
   const numPages = Math.ceil(data.length / numToShow);
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

function buildPage(numToShow, pageNum, studentData) {
   const start = (pageNum - 1) * numToShow;
   const pageData = studentData;
   const toShow = pageData.slice(start, start + numToShow);
   for (let i = 0; i < toShow.length; i++) {
      let currentStudent = toShow[i];
      createCard(currentStudent.picture.large,
         currentStudent.name.first,
         currentStudent.name.last,
         currentStudent.email,
         currentStudent.registered.date);
   }
   addPagination(pageNum, studentData, numToShow);
}

//build out the page with default values
buildPage(numToShow, currentPage, data);

linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      console.log(e.target.textContent);
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      buildPage(numToShow, e.target.textContent, data);
   }
});