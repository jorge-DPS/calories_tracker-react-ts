import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducers";
function App() {
  const [state, dispath] = useReducer(activityReducer, initialState);
  return (
    <>
      <header className="bg-linear-to-r from-fuchsia-600 via-purple-600 to-indigo-600 py-4">
        <div className="max-w-4xl mx-auto flex justify-between px-5">
          <h1 className="text-center text-lg font-extrabold text-white uppercase tracking-wide drop-shadow">
            Contador de calorías
          </h1>
        </div>
      </header>

      <section className="bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-5">
        <div className="max-w-4xl mx-auto rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 shadow-xl p-6 text-white">
          <Form dispatch={dispath} />
        </div>
      </section>
    </>
  );
}
export default App;
