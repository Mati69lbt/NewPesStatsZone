import { useMemo, useState } from "react";
import { buildJugadoresRows, getRowsForMetrica } from "../utils/periodoStats";
import EstadisticaPeriodoTable from "./EstadisticaPeriodoTable";

function EstadisticaPeriodoGroup({ periodo, matches, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const rows = useMemo(() => buildJugadoresRows(matches), [matches]);
  const goleadoresRows = useMemo(
    () => getRowsForMetrica(rows, "goleadores"),
    [rows],
  );
  const asistenciasRows = useMemo(
    () => getRowsForMetrica(rows, "asistencias"),
    [rows],
  );

  const totalGoles = useMemo(
    () => matches.reduce((sum, m) => sum + (m.golesClub ?? 0), 0),
    [matches],
  );
  const totalAsistencias = useMemo(
    () =>
      matches.reduce(
        (sum, m) =>
          sum +
          (m.incidenciasClub ?? []).reduce(
            (s, i) => s + (i.asistencias ?? 0),
            0,
          ),
        0,
      ),
    [matches],
  );
  const promedioGoles = matches.length > 0 ? totalGoles / matches.length : 0;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-300 shadow-lg dark:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b border-t-4 border-t-lime-400 border-b-zinc-200 bg-white px-4 py-3 text-left dark:border-b-zinc-700 dark:bg-zinc-800 sm:px-5 sm:py-4"
      >
        <div className="min-w-0">
          <h2 className="truncate text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-base">
            {periodo}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {matches.length} {matches.length === 1 ? "partido" : "partidos"} -{" "}
            {totalGoles} {totalGoles === 1 ? "gol" : "goles"} -{" "}
            {totalAsistencias}{" "}
            {totalAsistencias === 1 ? "asistencia" : "asistencias"} -{" "}
            {promedioGoles.toFixed(2)} prom. goles
          </p>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform ${open ? "" : "-rotate-90"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="grid grid-cols-1 gap-6 bg-zinc-50 px-2 py-4 dark:bg-zinc-900 sm:px-4 md:grid-cols-2">
          <EstadisticaPeriodoTable
            titulo="Goleadores"
            rows={goleadoresRows}
            metrica="goleadores"
          />
          <EstadisticaPeriodoTable
            titulo="Asistencias"
            rows={asistenciasRows}
            metrica="asistencias"
          />
        </div>
      )}
    </div>
  );
}

export default EstadisticaPeriodoGroup;
