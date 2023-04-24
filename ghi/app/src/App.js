import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";

export default function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
    <div className="container">
      <LocationForm />
      {/* <AttendeesList attendees={props.attendees} /> */}
    </div>
    </>
  );
}
