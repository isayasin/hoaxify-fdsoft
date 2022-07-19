import '../App.css';
import UserSignupPage from "../pages/userSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/loginPage";

function App() {
  return (
    <div>
        <div className="row">
            <div className="col">
                    <LoginPage/>
            </div>
            <div className="col">
                    <UserSignupPage/>
            </div>
        </div>
        <div className="text-center" >
            <LanguageSelector/>
        </div>

    </div>


  );
}

export default App;
