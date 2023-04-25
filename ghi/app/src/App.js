import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./Forms/LocationForm";
import ConferenceForm from "./Forms/ConferenceForm";
import PresentationForm from "./Forms/PresentationForm";
import AttendForm from "./Forms/AttendForm";

export default function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
    <div className="container">
      {/* <LocationForm /> */}
      {/* <ConferenceForm /> */}
      {/* <PresentationForm /> */}
      <AttendForm />
      {/* <AttendeesList attendees={props.attendees} /> */}
    </div>
    </>
  );
}
