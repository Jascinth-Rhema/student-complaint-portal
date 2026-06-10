async function loadDashboard() {

    const response = await fetch("/complaints");

    const complaints = await response.json();

    document.getElementById("total").innerText =
        complaints.length;

    const categoryCount = {};

    complaints.forEach(c => {

        categoryCount[c.category] =
            (categoryCount[c.category] || 0) + 1;

    });

    const categoriesDiv =
        document.getElementById("categories");

    let mostCategory = "";
    let max = 0;

    for(let category in categoryCount){

        categoriesDiv.innerHTML +=
            `<p>${category} : ${categoryCount[category]}</p>`;

        if(categoryCount[category] > max){

            max = categoryCount[category];
            mostCategory = category;

        }

    }

    document.getElementById("insight").innerText =
        `${mostCategory} are the most frequently reported complaints and require immediate attention.`;

}

loadDashboard();