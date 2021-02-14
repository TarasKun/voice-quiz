import './App.css';
import config from "./config";
import SignIn from "./component/singIn/SignIn";

function App() {
    window.gapi.load("client:auth2", function() {
    window.gapi.auth2.init({client_id: config.clientId, scope: config.scope});
});
  return (
    <div className="App center">
        <SignIn />
    </div>
  );
}

export default App;