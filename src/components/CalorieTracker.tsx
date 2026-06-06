import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};
export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  //Contadores
  const caloriesConsumed = useMemo(() => 
    activities.reduce(
        (total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);

  const caloriesBurned = useMemo(() =>
      activities.reduce(
        (total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);
        
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <h2 className="text-3xl font-black text-white">
          Resumen de <span className="text-fuchsia-400">Energía</span>
        </h2>
        <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ring-1 ${netCalories >= 0 ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30' : 'bg-rose-500/10 text-rose-400 ring-rose-500/30'}`}>
            {netCalories >= 0 ? 'Superávit' : 'Déficit'} Detectado
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-white/5 rounded-3xl ring-1 ring-white/10 backdrop-blur-sm">
          <div className="text-orange-400">
            <CalorieDisplay
                calories={caloriesConsumed}
                text="Consumidas"
            />
          </div>
          <div className="text-fuchsia-400">
            <CalorieDisplay
                calories={caloriesBurned}
                text="Quemadas"
            />
          </div>
          <div className={netCalories >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
            <CalorieDisplay
                calories={netCalories}
                text="Diferencia"
            />
          </div>
      </div>
    </div>
  );
}
