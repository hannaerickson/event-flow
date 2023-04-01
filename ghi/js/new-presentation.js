window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const selectTag = document.getElementById("conference");

            for (let conference of data.conferences) {
                let option = document.createElement("option");
                option.value = conference.id;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }
        }
    } catch (e) {
        console.error("Oops! Something went wrong.")
    }

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const select = document.getElementById('conference');
        const conferenceId = select.selectedIndex;
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(presentationUrl, fetchConfig);
          if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
          }
    });
})
