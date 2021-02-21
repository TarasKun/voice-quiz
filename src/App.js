import './App.css';
import SignIn from "./component/singIn/SignIn";

function App() {
    const { REACT_APP_CLIENT_ID, REACT_APP_SCOPE } = process.env;

    window.gapi.load("client:auth2", function() {
    window.gapi.auth2.init({client_id: REACT_APP_CLIENT_ID, scope: REACT_APP_SCOPE});
});
  return (
    <div className="App center">
        <SignIn />
    </div>
  );
}

export default App;