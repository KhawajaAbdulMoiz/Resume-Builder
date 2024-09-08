var mainForm = document.getElementById('cv-form'); // Casting form element
// Define the valid types for form validation
var validType = {
    TEXT: 'text', // Text input with letters and spaces
    TEXT_EMP: 'text_emp', // Text input with letters, spaces, and possibly empty
    EMAIL: 'email', // Email input
    DIGIT: 'digit', // Numeric input
    PHONENO: 'phoneno', // Phone number input
    ANY: 'any', // Any non-empty input
};
// Access form elements with type assertions
var firstnameElem = mainForm.elements['firstname'];
var middlenameElem = mainForm.elements['middlename'];
var lastnameElem = mainForm.elements['lastname'];
var imageElem = mainForm.elements['image']; // Adjust type if necessary
var designationElem = mainForm.elements['designation'];
var addressElem = mainForm.elements['address'];
var emailElem = mainForm.elements['email'];
var phonenoElem = mainForm.elements['phoneno'];
var summaryElem = mainForm.elements['summary'];
// Display elements for showing the form data
var nameDsp = document.getElementById('fullname_dsp'), imageDsp = document.getElementById('image_dsp'), phonenoDsp = document.getElementById('phoneno_dsp'), emailDsp = document.getElementById('email_dsp'), addressDsp = document.getElementById('address_dsp'), designationDsp = document.getElementById('designation_dsp'), summaryDsp = document.getElementById('summary_dsp'), projectsDsp = document.getElementById('projects_dsp'), achievementsDsp = document.getElementById('achievements_dsp'), skillsDsp = document.getElementById('skills_dsp'), educationsDsp = document.getElementById('educations_dsp'), experiencesDsp = document.getElementById('experiences_dsp');
// Fetch values from form fields
// The first value is for the attributes and the second one passes the nodelists
var fetchValues = function (attrs) {
    var nodeLists = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nodeLists[_i - 1] = arguments[_i];
    }
    var elemsAttrsCount = nodeLists.length;
    var elemsDataCount = nodeLists[0].length;
    var tempDataArr = [];
    // Loop through the data entries
    for (var i = 0; i < elemsDataCount; i++) {
        var dataObj = {}; // Creating an empty object to fill the data
        // Loop through attributes to fetch data
        for (var j = 0; j < elemsAttrsCount; j++) {
            // Setting the key name for the object and filling it with data
            dataObj["".concat(attrs[j])] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
// Get user inputs from form elements
var getUserInputs = function () {
    // Achievements
    var achievementsTitleElem = document.querySelectorAll('.achieve_title'), achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    // Experiences
    var expTitleElem = document.querySelectorAll('.exp_title'), expOrganizationElem = document.querySelectorAll('.exp_organization'), expLocationElem = document.querySelectorAll('.exp_location'), expDescriptionElem = document.querySelectorAll('.exp_description');
    // Education
    var eduSchoolElem = document.querySelectorAll('.edu_school'), eduDegreeElem = document.querySelectorAll('.edu_degree'), eduCityElem = document.querySelectorAll('.edu_city'), eduDescriptionElem = document.querySelectorAll('.edu_description');
    var projTitleElem = document.querySelectorAll('.proj_title'), projLinkElem = document.querySelectorAll('.proj_link'), projDescriptionElem = document.querySelectorAll('.proj_description');
    var skillElem = document.querySelectorAll('.skill');
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
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};
// Show list data in the specified container
var showListData = function (listData, listContainer) {
    listContainer.innerHTML = "";
    listData.forEach(function (listItem) {
        var itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        for (var key in listItem) {
            var subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = "".concat(listItem[key]);
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};
// Display the CV data in the corresponding elements
var displayCV = function (userData) {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
// Generate and display the CV
var generateCV = function () {
    var userData = getUserInputs();
    displayCV(userData);
    console.log(userData); // Log user data for debugging
};
// Function to preview the image
function previewImage() {
    var imageDsp = document.getElementById('image_dsp');
    if (imageElem.files && imageElem.files[0]) {
        var oFReader = new FileReader();
        oFReader.onload = function (ofEvent) {
            if (ofEvent.target && typeof ofEvent.target.result === 'string') {
                imageDsp.src = ofEvent.target.result;
            }
        };
        oFReader.readAsDataURL(imageElem.files[0]); // Read the selected image file
    }
    else {
        console.error('No file selected or file is invalid for preview.'); // Error handling if no file selected
    }
}
// Function to print the CV
function printCV() {
    window.print(); // Trigger print dialog for the CV
}
