document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("complaintForm");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const complaint = {
            name: document.getElementById("name").value,
            registerNumber: document.getElementById("registerNumber").value,
            department: document.getElementById("department").value,
            category: document.getElementById("category").value,
            problem: document.getElementById("problem").value,
            description: document.getElementById("description").value
        };

        try {

            const response = await fetch("/complaints", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(complaint)

            });

            const data = await response.json();

            alert(data.message);

            form.reset();

        } catch (error) {

            console.error(error);

            alert("Error submitting complaint");

        }

    });

});