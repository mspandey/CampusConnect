import React, { useState } from 'react';
import { TheaterViewport } from './TheaterViewport';

export function SeatSelectorModal({ event, isOpen, onClose, onConfirm }) {
  const [selectedSeat, setSelectedSeat] = useState({ row: 'G', col: 14 }); // Default to seat G14
  const ticketPrice = 50.00;

  if (!isOpen) return null;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-md mb-1">
              Interactive 3D Sightline Preview
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Your Seat: {event?.title || 'Spring Musical'}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Click any seat on the grid to instantly preview your exact view of the stage.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 3D WebGL Viewport */}
        <TheaterViewport selectedSeat={selectedSeat} />

        {/* 2D Seat Selection Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Auditorium Seating Grid (Stage is North)
            </span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600 block"></span> Selected</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-200 dark:bg-gray-700 block"></span> Available</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl overflow-x-auto space-y-2">
            <div className="text-center text-[10px] uppercase font-mono tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              --- Stage Direction ---
            </div>
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-center gap-2">
                <span className="w-6 text-xs font-mono font-bold text-gray-500 text-right">{row}</span>
                <div className="flex gap-1.5">
                  {cols.map((col) => {
                    const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
                    return (
                      <button
                        key={col}
                        onClick={() => setSelectedSeat({ row, col })}
                        className={`w-7 h-7 rounded text-[10px] font-mono transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400/40 scale-105'
                            : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Selected Seat</span>
            <span className="text-lg font-bold font-mono text-gray-900 dark:text-white">
              {selectedSeat ? `Row ${selectedSeat.row}, Seat ${selectedSeat.col}` : 'None selected'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Total Price</span>
              <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">${ticketPrice.toFixed(2)}</span>
            </div>
            <button
              disabled={!selectedSeat}
              onClick={() => onConfirm(selectedSeat)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              Confirm & Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
