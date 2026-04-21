import { useState } from "react";
import type { ChangeEvent, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducers";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = ( e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [id]: id === "category" || id === "calories" ? Number(value) : value,
    }));
  };

  const isValidity = () => {
    const { name, calories } = activity;
    console.log(activity);

    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-sm font-semibold tracking-wide text-white/90"
          >
            Categoría
          </label>

          <select
            id="category"
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition
                     hover:border-white/25 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20"
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-slate-950 text-white"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold tracking-wide text-white/90"
          >
            Actividad
          </label>
          <input
            type="text"
            id="name"
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition
                     placeholder:text-white/40 hover:border-white/25 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20"
            placeholder="Ej. Comida, jugo de naranja, ensalada, ejercicio, pesas, bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="calories"
          className="text-sm font-semibold tracking-wide text-white/90"
        >
          Calorías
        </label>
        <input
          type="number"
          id="calories"
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition
                   placeholder:text-white/40 hover:border-white/25 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20"
          placeholder="Ej. 100, 200, 350"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <div className="pt-2">
        <input
          type="submit"
          value={
            activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"
          }
          className="w-full rounded-2xl bg-fuchsia-500 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition
                   hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!isValidity()}
        />
      </div>
    </form>
  );
}
