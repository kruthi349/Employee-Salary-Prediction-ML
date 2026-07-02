const form = document.getElementById("salaryForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        job_title: document.getElementById("job").value,

        experience_years: Number(document.getElementById("experience").value),

        education_level: document.getElementById("education").value,

        skills_count: Number(document.getElementById("skills").value),

        industry: document.getElementById("industry").value,

        company_size: document.getElementById("company").value,

        location: document.getElementById("location").value,

        remote_work: document.getElementById("remote").value,

        certifications: Number(document.getElementById("certifications").value)

    };

    document.getElementById("salary").innerHTML = "Predicting...";
    document.getElementById("message").innerHTML = "";

    try{

        const response = await fetch("/predict",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        if(result.error){

            document.getElementById("salary").innerHTML = "Error";

            document.getElementById("message").innerHTML =
            result.error;

        }

        else{

            document.getElementById("salary").innerHTML =
            "₹ " + Number(result.salary).toLocaleString("en-IN",{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            });

            document.getElementById("message").innerHTML =
            "Prediction generated successfully.";

        }

    }

    catch(error){

        console.log(error);

        document.getElementById("salary").innerHTML="Server Error";

        document.getElementById("message").innerHTML=
        "Unable to connect to Flask server.";

    }

});