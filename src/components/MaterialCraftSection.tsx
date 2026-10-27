'use client';

import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export default function MaterialCraftSection() {
  const materials = [
    {
      name: "Honed Italian Travertine",
      property: "Thermal Inertia & Cool Underfoot",
      description: "Porous natural limestone providing soft diffuse light reflection in living pavilions without artificial glare.",
      colorHex: "#e3d8c5",
      accent: "Living Courts & Monoliths",
    },
    {
      name: "Reclaimed Old Teak",
      property: "Acoustic Warmth & Moisture Stability",
      description: "Seasoned timber salvaged from heritage structures, offering rich oil content resistant to Bengaluru monsoon humidity.",
      colorHex: "#7a4e2d",
      accent: "Ceiling Battens & Pivots",
    },
    {
      name: "Black Basalt Slabs",
      property: "Monolithic Water Plinths",
      description: "Dense igneous volcanic stone that absorbs intense daytime heat and cools rapidly at night through surface water evaporation.",
      colorHex: "#1c1e21",
      accent: "Reflection Pools & Plinths",
    },
    {
      name: "Patinated Architectural Brass",
      property: "Living Metal Surface",
      description: "Custom-alloyed unlacquered brass that ages gracefully over time, acquiring a soft golden-brown patina from daily human touch.",
      colorHex: "#c5a059",
      accent: "Custom Hardware & Sconces",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9f5] border-t border-black/[0.06]" aria-labelledby="materials-heading">
      <div className="idc-shell">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <div className="badge-pill mx-auto">
            <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Tactile Materiality</span>
          </div>
          <h2 id="materials-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#17181a] font-normal leading-tight">
            Materials Chosen for Permanence
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5e6268] leading-relaxed">
            We reject plastic laminates and synthetic veneers. Our projects are sculpted from honest geological substances that age gracefully over decades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 card-shadow border border-black/[0.06] flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div>
                <div
                  className="w-full h-16 rounded-xl mb-4 border border-black/10 transition-transform duration-300 group-hover:scale-[1.02] shadow-inner"
                  style={{ backgroundColor: mat.colorHex }}
                />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                  {mat.accent}
                </span>
                <h3 className="font-display text-2xl text-[#17181a] font-medium leading-snug">
                  {mat.name}
                </h3>
                <div className="text-xs font-semibold text-[#17181a]/70 mt-1">
                  {mat.property}
                </div>
                <p className="font-body text-xs text-[#5e6268] mt-2 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] text-[10px] font-mono text-[#5e6268] flex items-center justify-between">
                <span>SPECIFIED BY IDC</span>
                <span className="font-bold text-[#17181a]">PROTOTYPED IN STUDIO</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
