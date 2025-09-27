document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    const progressBar = document.querySelector(".progress");
    const form = document.getElementById("multiStepForm");

    let currentStep = 0;

    function updateProgressBar() {
        const progress = ((currentStep) / formSteps.length) * 100;
        progressBar.style.width = progress + "%";
    }

    function showStep(step) {
        formSteps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle("active", index === step);
        });
        updateProgressBar();
    }

    function nextStep() {
        if (currentStep < formSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener("click", nextStep);
    });

    prevButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll(".vehicle-option").forEach(option => {
        option.addEventListener("click", () => {
            document.getElementById("vehicleType").value = option.dataset.value;
            document.querySelectorAll(".vehicle-option").forEach(el => el.classList.remove("selected"));
            option.classList.add("selected");
            nextStep();
        });
    });

    document.querySelectorAll(".budget-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("budget").value = button.dataset.value;
            document.querySelectorAll(".budget-btn").forEach(el => el.classList.remove("selected"));
            button.classList.add("selected");
            nextStep();
        });
    });

    document.querySelectorAll(".finance-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("financingTime").value = button.dataset.value;
            document.querySelectorAll(".finance-btn").forEach(el => el.classList.remove("selected"));
            button.classList.add("selected");
            nextStep();
        });
    });

    document.querySelectorAll(".employment-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("employmentStatus").value = button.dataset.value;
            document.querySelectorAll(".employment-btn").forEach(el => el.classList.remove("selected"));
            button.classList.add("selected");
            nextStep();
        });
    });

    document.querySelectorAll(".bankruptcy-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("bankruptcy").value = button.dataset.value;
            document.querySelectorAll(".bankruptcy-btn").forEach(el => el.classList.remove("selected"));
            button.classList.add("selected");
            nextStep();
        });
    });

    document.querySelectorAll("#firstname, #lastname, #email, #phone, #homeaddress, #companyname, #jobtitle, #years, #months, #dob,#income").forEach(input => {
        input.addEventListener("input", () => {
            let hiddenField = document.getElementById("hidden" + input.id.replace(/-/g, "").charAt(0).toUpperCase() + input.id.replace(/-/g, "").slice(1));
            if (hiddenField) {
                hiddenField.value = input.value;
            }
        });
    });
    

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        console.log("Form Submitted:", data);
        alert("Thank you! Your information has been submitted.");

        // Reset form fields
        form.reset();

        // Remove all selected classes
        document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));

        // Reset hidden fields
        document.querySelectorAll("[id^=hidden]").forEach(hiddenInput => hiddenInput.value = "");

        // Reset progress and go back to the first step
        setTimeout(() => {
            currentStep = 0;
            showStep(currentStep);
        }, 1000);
    });


    showStep(currentStep);
});
