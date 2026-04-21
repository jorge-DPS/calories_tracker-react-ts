import type { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type ActivityListProps = {
  activities: Activity[];
};

function getCategoryInfo(categoryId: Activity["category"]) {
  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    return {
      name: "Sin categoría",
      badgeStyles: "bg-slate-500/15 text-slate-200 ring-slate-400/20",
      accentStyles: "bg-slate-400/70",
    };
  }

  return categoryId === 1
    ? {
        name: category.name,
        badgeStyles: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/20",
        accentStyles: "bg-emerald-400/80",
      }
    : {
        name: category.name,
        badgeStyles: "bg-orange-500/15 text-orange-300 ring-orange-400/20",
        accentStyles: "bg-orange-400/80",
      };
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Comidas y actividades
        </h2>
        <p className="mt-2 text-sm text-white/60 md:text-base">
          Revise todo lo registrado en un solo lugar
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-14 text-center shadow-lg backdrop-blur-sm">
          <p className="text-lg font-semibold text-white/80">
            Aún no hay actividades registradas
          </p>
          <p className="mt-2 text-sm text-white/50">
            Agregue una comida o un ejercicio para comenzar
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const category = getCategoryInfo(activity.category);

            return (
              <article
                key={activity.id}
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-lg backdrop-blur-md transition hover:border-white/15 hover:bg-white/15"
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1 ${category.accentStyles}`}
                />

                {/* LADO IZQUIERDO ORDENADO */}
                <div className="min-w-0 flex-1 pl-2">
                  <div className="flex flex-col gap-3">
                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ring-1 ${category.badgeStyles}`}
                      >
                        {category.name}
                      </span>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-black/10 px-3 py-3 ring-1 ring-white/10">
                      <h3 className=" text-lg font-bold  text-white md:text-xl">
                        {activity.name}
                      </h3>
                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-black/10 px-3 py-2 ring-1 ring-white/10">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Calorías
                      </span>
                      <span className="text-xl font-extrabold leading-none text-fuchsia-300 md:text-2xl">
                        {activity.calories}
                      </span>
                      <span className="text-sm font-medium text-white/55">
                        kcal
                      </span>
                    </div>
                  </div>
                </div>

                {/* LADO DERECHO */}
                <div className="shrink-0 border-l border-white/10 pl-4">
                  <div className="flex items-center gap-2 rounded-2xl bg-black/10 p-1.5 ring-1 ring-white/10">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition hover:bg-fuchsia-500/10 hover:text-fuchsia-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/20"
                      aria-label={`Editar ${activity.name}`}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition hover:bg-rose-500/10 hover:text-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
                      aria-label={`Eliminar ${activity.name}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}