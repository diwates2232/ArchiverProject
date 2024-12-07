// Function to fetch region data and update the UI
function fetchRegionData(regionName) {
    // Show loading message
    document.getElementById("controllers-list").innerHTML = "<p>Loading controllers...</p>";
    document.getElementById("archivers-list").innerHTML = "<p>Loading archivers...</p>";

    // Fetch data from the backend
    fetch(`http://localhost:3000/api/regions/${regionName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch region data");
            }
            return response.json();
        })
        .then(data => {
            updateDetails(data);
        })
        .catch(error => {
            document.getElementById("controllers-list").innerHTML = `<p>Error: ${error.message}</p>`;
            document.getElementById("archivers-list").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to update the controllers and archivers details
function updateDetails(data) {
    // Update controllers
    let controllersHTML = "<ul>";
    data.controllers.forEach(controller => {
        controllersHTML += `
            <li>
                <strong>Controller Name:</strong> ${controller.ControllerName}<br>
                <strong>IP Address:</strong> ${controller["Ip Addr"]}<br>
                <strong>Status:</strong> ${controller.status}
            </li>`;
    });
    controllersHTML += "</ul>";
    document.getElementById("controllers-list").innerHTML = controllersHTML;

    // Update archivers
    let archiversHTML = "<ul>";
    data.archivers.forEach(archiver => {
        archiversHTML += `
            <li>
                <strong>Archiver Name:</strong> ${archiver["Archiver Name"]}<br>
                <strong>IP Address:</strong> ${archiver["Ip Address of archiver"]}<br>
                <strong>Status:</strong> ${archiver.status}
            </li>`;
    });
    archiversHTML += "</ul>";
    document.getElementById("archivers-list").innerHTML = archiversHTML;
}

// Attach event listeners to region buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("APAC").addEventListener("click", () => fetchRegionData("APAC"));
    document.getElementById("EMEA").addEventListener("click", () => fetchRegionData("EMEA"));
    document.getElementById("LACCA").addEventListener("click", () => fetchRegionData("LACCA"));
    document.getElementById("NAMER").addEventListener("click", () => fetchRegionData("NAMER"));
});
