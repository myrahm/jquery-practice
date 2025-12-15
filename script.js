// make sure all code runs only after the DOM is fully loaded using jQuery's ready function
$(document).ready(function() {


   problemOne();
   problemTwo();
   problemThree();


   function problemOne() {
       // get all needed elements
       const nameInput = document.getElementById('name');
       const addressInput = document.getElementById('address');
       const phoneInput = document.getElementById('phone');
       const submitButton = document.getElementById('submit-btn');
       const nameOutput = document.getElementById('p1name');
       const addressOutput = document.getElementById('p1address');
       const phoneOutput = document.getElementById('p1phone');
      
       // helper function to check if a character is a digit
       function isDigit(char) {
           return char >= '0' && char <= '9';
       }


       // name must contain only letters and spaces
       function checkName(name) {
           // go through every character in the string
           for (let i = 0; i < name.length; i++) {
               const char = name.charAt(i);
               if (!(char.toUpperCase() >= 'A' && char.toUpperCase() <= 'Z') && char !== ' ') {
                   return false;
               }
           }
           return true;
       }


       function checkPhone(phone) {
           // constraint 1. check length, make sure it's 14 digits
           if (phone.length !== 14) {
               return false;
           }


           // constaint 2. check positions for special characters (they MUST be at that position according to lab rules/guidelines)
           if (phone.charAt(0) !== '(' || phone.charAt(4) !== ')' || phone.charAt(5) !== ' ' || phone.charAt(9) !== '-') {
               return false;
           }


           // constraint 3. check digit positions using loops
           for (let i = 1; i <= 3; i++) {
               if (!isDigit(phone.charAt(i))) return false;
           }
           for (let i = 6; i <= 8; i++) {
               if (!isDigit(phone.charAt(i))) return false;
           }
           for (let i = 10; i <= 13; i++) {
               if (!isDigit(phone.charAt(i))) return false;
           }


           return true;
       }


       // convert (###) ###-#### to ###-###-#### format to display
       function changePhoneNum(phone) {
           const areaCode = phone.substring(1, 4);  
           const exchange = phone.substring(6, 9); 
           const number = phone.substring(10, 14); 
           let newPhone = areaCode + '-' + exchange + '-' + number;          
           return newPhone;
       }


       // function to display results
       function display(name, address, phone) {
           nameOutput.innerHTML = ` <h3 style="color: #0056b3">Name</h3> <p>${name}</p>`;
           addressOutput.innerHTML = ` <h3 style="color: #0056b3">Address</h3> <p>${address}</p>`;
           phoneOutput.innerHTML = `<h3 style="color: #0056b3">Phone Number</h3><p>${phone}</p>`;
       }
      
       // function to reset the output divs to their original, uncolored state
       const resetOutput = () => {
           nameOutput.innerHTML = '<h3>Name</h3>';
           addressOutput.innerHTML = '<h3>Address</h3>';
           phoneOutput.innerHTML = '<h3>Phone Number</h3>';
       };


       // event handler for the submit button using addEventListener
       submitButton.addEventListener('click', function() {
           // get the values using .value property
           const name = nameInput.value.trim();
           const address = addressInput.value.trim();
           const phone = phoneInput.value.trim();
          
           // reset output before starting validation
           resetOutput();


           // 1. check for empty fields
           if (name === '' || address === '' || phone === '') {
               alert('Validation Error: All fields (Name, Address, Phone Number) must be provided.');
               return;
           }


           // 2. check name constraints
           if (!checkName(name)) {
               alert('Validation Error: Name must contain only letters and spaces.');
               return;
           }
          
           // 3. check phone constraints
           if (!checkPhone(phone)) {
               alert('Validation Error: Phone number must be in the exact format (###) ###-####.');
               return;
           }


           // after we checked for ALL constraints, we can change the phone number format and finally, display the results
           const phone2 = changePhoneNum(phone);
           display(name, address, phone2);
       });
    
   }




   function problemTwo() {
         
       const timeEle = document.getElementById('p2');


       function showTime() {
       
           const now = new Date();
           const hours = now.getHours();
           const minutes = now.getMinutes();
           const seconds = now.getSeconds();


           // apply padding directly using String() and padStart()
           const paddedHours = String(hours).padStart(2, '0');
           const paddedMinutes = String(minutes).padStart(2, '0');
           const paddedSeconds = String(seconds).padStart(2, '0');


           const timeString = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;


           if (timeEle) {
               timeEle.innerHTML = timeString;
           }
       }


       showTime(); // gotta call the funciton
       setInterval(showTime, 1000); // we wanna execute it repeatedly every 1000 milliseconds (so basically always live)
   }




   function problemThree() {
       const $container = $('#p3-container');
       const $image = $('#p3-image');
       const ogSize = { width: $container.width(), height: $container.height() };
       const targetLargeSize = { width: 600, height: 400 };
       const animationSpeed = 2000;


       // make image larger when clicked
       $image.on('click', function () {
           if ($container.data('animating')) {
               return;
           }
           else {
               $container.data('animating', true);
           }


       // animate container size
       $container.animate(
           // properties
           { width: targetLargeSize.width, height: targetLargeSize.height},
           // speed
           animationSpeed,
           // callback
               function () {
                   $container.removeData('animating');
                   // add curved text
                   const $text = $(`
                       <div id="curved-text">
                           <span class="curved-line">cat outside a house fire?!</span>
                       </div>
                   `);
                   $container.append($text);
                   // add icon
                   const $icon = $(`<span id="reset-icon" class="material-symbols-outlined" title="Shrink">close_fullscreen</span>`);
                   $container.append($icon);
               }
           );
       });


       // reset functionality
       $container.on('click', '#reset-icon', function (event) {
           event.stopPropagation();
           if ($container.data('animating')) return;
           $container.data('animating', true);


           // remove the text and icon
           $('#curved-text').remove();
           $('#reset-icon').remove();


           // go back to og size
           $container.animate(
               {
                   width: ogSize.width,
                   height: ogSize.height
               },
               animationSpeed,
               function () {
                   $container.removeData('animating');
               }
           );
       });
   }


});
