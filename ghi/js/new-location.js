window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/states/";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("There has been an error");
    } else {
      const data = await response.json();
      const selectTag = document.getElementById("state");

      for (let state of data.states) {
        let option = document.createElement("option");
        option.value = Object.values(state);
        option.innerHTML = Object.keys(state);
        selectTag.appendChild(option);
      }
    }
  } catch (e) {
    console.error("There has been an error");
  }
});
