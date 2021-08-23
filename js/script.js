let navButtonsLive = document.getElementsByClassName('navbar-links__button');
let sectionsLive = document.getElementsByClassName('main__section');
let sectionsContainer = document.querySelector('.sections-container');
let main = document.querySelector('.main');
let navbarLinks = document.querySelector(".navbar-links");
let windowHeight = window.innerHeight/4;
let addButton = document.querySelector('.add');
let popup = document.querySelector('.popup');
let overlay = document.querySelector('.overlay');
let body = document.getElementsByTagName('body')[0];
let sectionsText = document.getElementsByClassName('main__section__text');
let titleField = document.querySelector('.popup__title-input');
let textareaField = document.querySelector('.popup__text-area');



/*                       Helper Functions                              */

//1- adds active state if the section is in the view 
let addActiveState = (currentIndex) =>{
    
    
    let navButtonsStatic = Array.from(navButtonsLive);
    navButtonsStatic.forEach(e=>{
        e.classList.remove('active');
    })
     navButtonsStatic[currentIndex].classList.add('active');
    
    

};

//2- hides the popup window
//resets the input fields to be empty 
// removes the active states that show them up
//removes overflow hidden property as it prevents all the elements from scrolling

let hidePopUp = () =>{
    titleField.value = "";
    textareaField.value = "";
    popup.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('overflow-hidden');
    Array.from(sectionsText).forEach(e=>{
        e.classList.remove('overflow-hidden');
    })

}
//3- shows the popup window
//adds the default title name onto the place holder attribute
//adds the active states that show them up
//adds overflow hidden property as it prevents all the elements from scrolling
let showPopUp = ()=>{
    titleField.placeholder = `
    default : Section ${sectionsLive.length} / only 10ch 
          `;
          popup.classList.add('active');
          overlay.classList.add('active');
          body.classList.add('overflow-hidden');
          Array.from(sectionsText).forEach(e=>{
              e.classList.add('overflow-hidden');
          })
  

}
//4-adds the nav component
// creates li elements then inserts the data into the innerhtml porperty
// appends the li elements to ul element 
let addNavButton = titleFieldVal =>{
    let el = document.createElement('li');
    el.innerHTML = `<a href="#section${sectionsLive.length}" class = "navbar-links__button" data-nav = "${sectionsLive.length}" >${titleFieldVal}</a>`
    navbarLinks.appendChild(el);

   
}
//5-adds section component
//adds (section + its order in the list) as a string  to the id attribute
// inserts the sections innter html components 
//appends the section to the section container div
let addSection  = (titleFieldVal,textAreaFieldVal) =>{
    let el = document.createElement('div');
    el.classList.add('main__section');
    el.id = `section${sectionsLive.length}`;
    
    el.innerHTML =  `
        <h3 class = "main__section__title">${titleFieldVal}</h3>
         <p class="main__section__text">
         ${textAreaFieldVal}
         </p> 
        
    `;

    sectionsContainer.appendChild(el);
   

}
///////////////////////////////////////////////////////////////////////////



/*                     Event Listeners                          */ 
//1-add active state based on the section that is appearing in the viewport
/*
algorithm works as follows : 
1- it determines the distance of the top of the container  repesctive to the top of the browser by getBoundingClientRect().top function 
2-the top border of the container when it exceeds the top of the browser it gives negative value so it's avoided by if ( currentTop >= 0  ) line 116
3- then gets the index of the element by (getting the element from the calling event) and checking which of the section elements equals to the calling element then its index gets sent
*/
window.addEventListener('scroll' , () => {
    let currentIndex  = 0 ;
let sectionsStatic = Array.from(sectionsLive);
sectionsStatic.forEach(e=>
    {
        
        let currentTop = e.getBoundingClientRect().top;
       
        if(currentTop <= windowHeight && currentTop>= 0  ){
            
            for (let i = 0 ; i<sectionsLive.length ; i++){
                if (e === sectionsLive[i]){
                    currentIndex = i;
                    break;
                }
                    
            }
            addActiveState(currentIndex);
        }
    })

    },true);


//2-changes the scroll behavior of page 
/*
algorithm works as follows : 
1- if the calling target is a navbar button so (section+data-nav value)   gets quered into the getelementbyid function to get the section element that has that id
2-then that element get scrolled to by scrollIntoView()

*/

    navbarLinks.addEventListener('click' , e =>{
        if (e.target.classList.contains('navbar-links__button')){
            let sec = document.getElementById(`section${e.target.dataset.nav}`);
            sec.scrollIntoView({  
                behavior :"smooth",
                block :"center"
                }
                );
          
          
         
        }
    })
//2-opens the popup window on click
 addButton.addEventListener('click' , showPopUp);

//3-handles the close button  which calls hidePopUp function inverse of showPopUp and handles the submit button as follows  
/*algorithm works as follows : 
1-if the target is the close button reset the fields and closes and removing the active classes from the pop up window
2-else if the button contains submit then
a- if the textarea value is empty dont procced and insert that this field is req
b- else if textarea value is not empty 
check :
if the title input just use the place holder value and set flag to true
if its not empty and its size is less than or equal to 10 set flag to true 
then
if flag is true just add the nav and the section coressponding to it
else empty the title field 

*/

    popup.addEventListener('click' ,e=>{
        let titleFieldVal ;
         if(e.target.classList.contains('close-button')){
        hidePopUp();
        }else if(e.target.classList.contains('submit')){
            if(textareaField.value === ""){
                textareaField.placeholder = "This Field is Required !";

            }else{
                let flag = false;
               
                if(titleField.value === ""){
                    titleFieldVal = `Section ${sectionsLive.length}`;
                    flag =true;
                    
                 }else{
                    if(titleField.value.length <= 10){
                        flag = true;
                        titleFieldVal = titleField.value;
                    }
               
                }
               if(flag){
    		    addNavButton(titleFieldVal);
                    addSection(titleFieldVal,textareaField.value);
                    hidePopUp();
                    
               }else{
			    titleField.value = "";
                   
               }
               

            }
            
        }
       
    });
   ///////////////////////////////////////////////////////////////////////////////