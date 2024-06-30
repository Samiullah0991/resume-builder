document.addEventListener("DOMContentLoaded", () => {
    const resumeForm = document.getElementById("resume-form");
    const resumePreview = document.getElementById("resume-preview");
    const exportButton = document.getElementById("export-button");
    const templateButtons = document.querySelectorAll(".template-btn");
    let currentTemplate = 'template1';
  
    // Function to update the resume preview
    const updatePreview = () => {
      const name = document.getElementById("name").value;
      const dob = document.getElementById("dob").value;
      const nationality = document.getElementById("nationality").value;
      const contact = document.getElementById("contact").value;
      const workExperience = document.getElementById("work-experience").value;
      const education = document.getElementById("education").value;
      const skills = document.getElementById("skills").value;
      const languages = document.getElementById("languages").value;
  
      resumePreview.innerHTML = `
        <div class="${currentTemplate}">
          <h1>${name}</h1>
          <p><strong>Date of Birth:</strong> ${dob}</p>
          <p><strong>Nationality:</strong> ${nationality}</p>
          <p><strong>Contact Information:</strong> ${contact}</p>
          <h2>Work Experience</h2>
          <p>${workExperience}</p>
          <h2>Education</h2>
          <p>${education}</p>
          <h2>Digital Skills</h2>
          <p>${skills}</p>
          <h2>Language Skills</h2>
          <p>${languages}</p>
        </div>
      `;
    };
  
    // Event listener for form inputs
    resumeForm.addEventListener("input", updatePreview);
  
    // Event listeners for template selection
    templateButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        currentTemplate = event.target.dataset.template;
        updatePreview();
      });
    });
  
    // Event listener for export button
    exportButton.addEventListener("click", () => {
      const element = document.getElementById("resume-preview");
      html2pdf().from(element).save('resume.pdf');
    });
  
    // Function to load templates CSS
    const loadTemplateCSS = (template) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `templates/${template}.css`;
      document.head.appendChild(link);
    };
  
    // Load initial template CSS
    loadTemplateCSS(currentTemplate);
  });
// Function to load templates CSS
const loadTemplateCSS = (template) => {
    // Remove existing template styles
    const existingLinks = document.querySelectorAll('link[rel="stylesheet"]');
    existingLinks.forEach(link => {
      if (link.href.includes('templates/')) {
        document.head.removeChild(link);
      }
    });
    
    // Load new template styles
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `templates/${template}.css`;
    document.head.appendChild(link);
  };
  
  // Event listener for template selection
  templateButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      currentTemplate = event.target.dataset.template;
      loadTemplateCSS(currentTemplate);
      updatePreview();
    });
  });
    