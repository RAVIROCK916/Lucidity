import "./App.css";
import Header from "./components/Header";
import Inventory from "./components/Inventory";

function App() {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<div className="h-[90vh] w-[90vw]">
				<Header />
				<Inventory />
			</div>
		</div>
	);
}

export default App;
