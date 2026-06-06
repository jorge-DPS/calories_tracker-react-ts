import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducers";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('actividades', JSON.stringify(state.activities));
  }, [state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <header className="bg-linear-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-lg">
          <div className="mx-auto max-w-5xl px-5 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-extrabold uppercase tracking-wide drop-shadow md:text-3xl">
                Contador de calorías
              </h1>
              <p className="mt-1 text-sm text-white/80 md:text-base">
                Registre comidas y ejercicios de forma clara y ordenada
              </p>
            </div>

            <button
              className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/20 hover:shadow-lg active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed md:text-sm ring-1 ring-white/30 backdrop-blur-sm"
              disabled={!canRestartApp}
              onClick={() => { dispatch({ type: 'restart-app' })}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Reiniciar App
            </button>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10">
          <section className="rounded-3xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur-md md:p-8">
            <Form 
              dispatch={dispatch}
              state={state}
            />
          </section>

          <section className="py-5">
            <div className="max-w-4xl mx-auto">
              <CalorieTracker 
                activities={state.activities}
              />
            </div>
          </section>

          <section className="rounded-3xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm md:p-8">
            <ActivityList 
              activities={state.activities} 
              dispatch={dispatch}
            />
          </section>
        </main>
      </div>
    </>
  );
}
export default App;
