

const mainForm = document.getElementById('cv-form') as HTMLFormElement; // Casting form element

// Define the valid types for form validation
const validType = {
    TEXT: 'text', // Text input with letters and spaces
    TEXT_EMP: 'text_emp', // Text input with letters, spaces, and possibly empty
    EMAIL: 'email', // Email input
    DIGIT: 'digit', // Numeric input
    PHONENO: 'phoneno', // Phone number input
    ANY: 'any', // Any non-empty input
};

// Access form elements with type assertions
const firstnameElem = mainForm.elements['firstname'] as HTMLInputElement;
const middlenameElem = mainForm.elements['middlename'] as HTMLInputElement;
const lastnameElem = mainForm.elements['lastname'] as HTMLInputElement;
const imageElem = mainForm.elements['image'] as HTMLInputElement; // Adjust type if necessary
const designationElem = mainForm.elements['designation'] as HTMLInputElement;
const addressElem = mainForm.elements['address'] as HTMLInputElement;
const emailElem = mainForm.elements['email'] as HTMLInputElement;
const phonenoElem = mainForm.elements['phoneno'] as HTMLInputElement;
const summaryElem = mainForm.elements['summary'] as HTMLTextAreaElement;

// Display elements for showing the form data
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

// Fetch values from form fields
// The first value is for the attributes and the second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    const tempDataArr: any[] = [];

    // Loop through the data entries
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // Creating an empty object to fill the data
        // Loop through attributes to fetch data
        for(let j = 0; j < elemsAttrsCount; j++){
            // Setting the key name for the object and filling it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

// Get user inputs from form elements
const getUserInputs = () => {

    // Achievements
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // Experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // Education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    
  

    // Return collected user data
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value, 
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem,  expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city','edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem,  eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};



// Show list data in the specified container
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

// Display the CV data in the corresponding elements
const displayCV = (userData) => {
    showListData(userData.summary,summaryDsp)
    showListData(userData.designation,designationDsp)
    showListData(userData.email,emailDsp)
    showListData(userData.address,addressDsp)
    showListData(userData.phoneno,phonenoDsp)
    showListData(userData.firstname + " " + userData.middlename + " " + userData.lastname,nameDsp);
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// Generate and display the CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData); // Log user data for debugging
}

// Function to preview the image
function previewImage() {
    const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
    if (imageElem.files && imageElem.files[0]) {
        const oFReader = new FileReader();
        oFReader.onload = function (ofEvent: ProgressEvent<FileReader>) {
            if (ofEvent.target && typeof ofEvent.target.result === 'string') {
                imageDsp.src = ofEvent.target.result;
            }
        };
        oFReader.readAsDataURL(imageElem.files[0]); // Read the selected image file
    } else {
        console.error('No file selected or file is invalid for preview.'); // Error handling if no file selected
    }
}

// Function to print the CV
function printCV(): void {
    window.print(); // Trigger print dialog for the CV
}
