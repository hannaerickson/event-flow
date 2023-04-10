window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/conferences/";
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const selectTag = document.getElementById("conference");

            for (let conference of data.conferences) {
                let option = document.createElement("option");
                option.value = conference.href;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }
            const loadingTag = document.getElementById('loading-conference-spinner');
            loadingTag.classList.add("d-none");
            selectTag.classList.remove("d-none");
        }
    } catch (e) {
        console.error("Could not load conferences.")
    }
    const formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(attendeeUrl, fetchConfig);
          if (response.ok) {
            const successTag = document.getElementById('success-message');
            successTag.classList.remove("d-none");
            formTag.classList.add("d-none");
          }
    });
})
