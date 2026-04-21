import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <header className="bg-linear-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-lg">
          <div className="mx-auto max-w-5xl px-5 py-5">
            <h1 className="text-center text-2xl font-extrabold uppercase tracking-wide drop-shadow md:text-3xl">
              Contador de calorías
            </h1>
            <p className="mt-2 text-center text-sm text-white/80 md:text-base">
              Registre comidas y ejercicios de forma clara y ordenada
            </p>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10">
          <section className="rounded-3xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur-md md:p-8">
            <Form dispatch={dispatch} />
          </section>

          <section className="rounded-3xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm md:p-8">
            <ActivityList activities={state.activities} />
          </section>
        </main>
      </div>
    </>
  );
}
export default App;
