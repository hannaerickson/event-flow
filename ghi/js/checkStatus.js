const payloadCookie = await cookieStore.get("jwt_access_payload")
if (payloadCookie) {
  const decodedPayload = atob(payloadCookie.value)
  const payload = JSON.parse(decodedPayload)
  console.log(payload);
  if (payload.user.perms.includes("events.add_conference") &&
    (payload.user.perms.includes("events.add_location"))) {
        const locationLinkTag = document.getElementById('hidden-location');
        locationLinkTag.classList.remove("d-none");
        const conferenceLinkTag = document.getElementById('hidden-conference');
        conferenceLinkTag.classList.remove("d-none");
        const presentationLinkTag = document.getElementById('hidden-presentation');
        presentationLinkTag.classList.remove("d-none");
  }
}
