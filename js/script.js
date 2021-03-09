/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

console.log(data.length);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(url, firstName, lastName, userEmail, joinDate) {
   const li = document.createElement('LI');
   li.className = 'student-item cf';

   const studentDetails = document.createElement('DIV');
   studentDetails.className = 'student-details';

   const avatar = document.createElement('IMG');
   avatar.className = 'avatar';
   avatar.src = url;
   avatar.alt = `${firstName} ${lastName} profile picture`;

   const h3 = document.createElement('H3');
   h3.textContent = `${firstName} ${lastName}`;

   const email = document.createElement('SPAN');
   email.className = 'email';
   email.textContent = userEmail;

   studentDetails.appendChild(avatar);
   studentDetails.appendChild(h3);
   studentDetails.appendChild(email);

   const joinDetails = document.createElement('DIV');
   joinDetails.className = 'joined-details';

   const date = document.createElement('SPAN');
   date.className = 'date';
   date.textContent = joinDate;

   joinDetails.appendChild(date);

   li.appendChild(studentDetails);
   li.appendChild(joinDetails);

   studentList.appendChild(li);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(page,data) {
   const numPages = Math.ceil(data.length / 9);
   if (numPages > 1) {
      for (let i = 1; i <= numPages; i++) {
         const li = document.createElement('LI');
         const button = document.createElement('BUTTON');
         button.type = 'button';
         button.textContent = i;
         if (page == i) {
            button.className = 'active';
         }
         li.appendChild(button);
         linkList.appendChild(li);
      }
   }
}

buildPage(9,1,data);
function buildPage (numToShow,pageNum,studentData) {
   const start = (pageNum - 1) * numToShow;
   const pageData = studentData;
   const toShow = pageData.slice(start, start + numToShow);
   for(let i = 0; i < toShow.length; i++) {
      let currentStudent = toShow[i];
      showPage(currentStudent.picture.large,
         currentStudent.name.first,
         currentStudent.name.last,
         currentStudent.email, 
         currentStudent.registered.date);
   }
   addPagination(pageNum,studentData);
}

linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      console.log(e.target.textContent);
      studentList.innerHTML = '';
      linkList.innerHTML = '';
      buildPage(9,e.target.textContent,data);
   }
});