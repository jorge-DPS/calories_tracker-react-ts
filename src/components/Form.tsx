import { useState } from "react";
import type { ChangeEvent, Dispatch } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducers";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}
export default function Form({ dispatch } : FormProps) {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setActivity( (prevActivity) => ({
      ...prevActivity,
      [id]: id === "category" || id === "calories" ? Number(value) : value,
    }))
  }

  const isValidity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payLoad:{ newActivity: activity } })
    
  }
  return (
    <form className="space-y-5 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 shadow-xl p-6 text-white" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="category" className="text-sm font-semibold text-white/90" >
          Categoría
        </label>

        <select
          id="category"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white outline-none
                 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20
                 hover:border-white/25 transition"
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

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-white/90">
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white outline-none
                 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20
                 hover:border-white/25 transition"
          placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejericio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="calories"
          className="text-sm font-semibold text-white/90"
        >
          Calorías
        </label>
        <input
          type="number"
          id="calories"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white outline-none
                 focus:border-fuchsia-400/60 focus:ring-4 focus:ring-fuchsia-500/20
                 hover:border-white/25 transition"
          placeholder="Calorias. Ej. 100, 200"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
        className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors disabled:opacity-45 disabled:cursor-not-allowed"
        disabled={!isValidity()}
      />
    </form>
  );
}
