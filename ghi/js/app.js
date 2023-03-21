function createCard(title, description, location, pictureUrl, starts, ends) {
  return `
    <div class="col">
      <div class="card shadow-lg bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
          ${starts} - ${ends}
        </div>
      </div>
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(
            details.conference.starts
          ).toLocaleDateString();
          const ends = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name;
          const html = createCard(
            title,
            description,
            location,
            pictureUrl,
            starts,
            ends
          );

          const column = document.querySelector(".row");
          column.innerHTML += html;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
});
