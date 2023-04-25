import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import MainPage from "./Components/MainPage";
import AttendeesList from "./Components/AttendeesList";
import LocationForm from "./Components/Forms/LocationForm";
import ConferenceForm from "./Components/Forms/ConferenceForm";
import PresentationForm from "./Components/Forms/PresentationForm";
import AttendForm from "./Components/Forms/AttendForm";

export default function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
        <Route index element={<MainPage />} />
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
          <Route path="attendees">
            <Route path="list" element={<AttendeesList attendees={props.attendees}/>} />
            <Route path="new" element={<AttendForm />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
