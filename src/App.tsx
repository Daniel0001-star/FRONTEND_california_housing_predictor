/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, 
  MapPin, 
  Home, 
  Calendar, 
  DollarSign, 
  Navigation, 
  ChevronRight, 
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';

interface HousingFormData {
  longitude: number;
  latitude: number;
  housingMedianAge: number;
  totalRooms: number;
  totalBedrooms: number;
  population: number;
  households: number;
  medianIncome: number;
  oceanProximity: string;
}

interface PredictionResult {
  predictedValue: number;
  confidence: number;
  timestamp: string;
}

export default function App() {
  const [formData, setFormData] = useState<HousingFormData>({
    longitude: -122.23,
    latitude: 37.88,
    housingMedianAge: 41,
    totalRooms: 880,
    totalBedrooms: 129,
    population: 322,
    households: 126,
    medianIncome: 8.3252,
    oceanProximity: 'NEAR BAY'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const getPrediction = async (data: HousingFormData): Promise<PredictionResult> => {
    // Note: The URL will be updated upon deployment.
    const API_URL = 'https://backend-california-housing-predictor-1.onrender.com/predict';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Prediction service unavailable. Please check your backend connection.');
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await getPrediction(formData);
      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.warn('API call failed, ensure backend is running at http://localhost:8000/predict');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen sophisticated-gradient p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-12 border-b border-ocean-cyan/20 pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-display font-bold tracking-tight text-ocean-cyan">
            California Housing Predictor By CHINE
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-ocean-navy/50 rounded-full border border-ocean-teal/20">
          <div className="w-2 h-2 rounded-full bg-ocean-teal animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ocean-cyan/60">System Online</span>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-10 items-start">
        {/* Left Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="form-container"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Economic Context */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                Median Income (x$10k)
              </label>
              <input 
                type="number" 
                step="0.0001"
                name="medianIncome"
                value={formData.medianIncome}
                onChange={handleInputChange}
                className="chine-input"
                placeholder="e.g. 8.3252"
              />
            </div>

            {/* Structure Group */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Housing Median Age
                </label>
                <input 
                  type="number" 
                  name="housingMedianAge"
                  value={formData.housingMedianAge}
                  onChange={handleInputChange}
                  className="chine-input"
                  placeholder="Years"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Total Rooms
                </label>
                <input 
                  type="number" 
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  className="chine-input"
                  placeholder="e.g. 880"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Total Bedrooms
                </label>
                <input 
                  type="number" 
                  name="totalBedrooms"
                  value={formData.totalBedrooms}
                  onChange={handleInputChange}
                  className="chine-input"
                  placeholder="e.g. 129"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Population
                </label>
                <input 
                  type="number" 
                  name="population"
                  value={formData.population}
                  onChange={handleInputChange}
                  className="chine-input"
                  placeholder="e.g. 322"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Households
                </label>
                <input 
                  type="number" 
                  name="households"
                  value={formData.households}
                  onChange={handleInputChange}
                  className="chine-input"
                  placeholder="e.g. 126"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan ml-1">
                  Ocean Proximity
                </label>
                <select 
                  name="oceanProximity"
                  value={formData.oceanProximity}
                  onChange={handleInputChange}
                  className="chine-input appearance-none bg-black/40"
                >
                  <option value="<1H OCEAN">&lt;1H OCEAN</option>
                  <option value="INLAND">INLAND</option>
                  <option value="NEAR OCEAN">NEAR OCEAN</option>
                  <option value="NEAR BAY">NEAR BAY</option>
                  <option value="ISLAND">ISLAND</option>
                </select>
              </div>
            </div>

            {/* Geospatial Data Group */}
            <div className="bg-black/10 p-5 rounded-2xl border border-ocean-teal/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest font-bold text-ocean-cyan/40">Geospatial Data Context</div>
                <div className="px-2 py-0.5 bg-ocean-teal/10 rounded text-[9px] text-ocean-teal font-mono">CAL-GRID v.04</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan/60 ml-1">
                    Latitude
                  </label>
                  <input 
                    type="number" 
                    step="0.0001"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="chine-input border-ocean-teal/10"
                    placeholder="37.88"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-ocean-cyan/60 ml-1">
                    Longitude
                  </label>
                  <input 
                    type="number" 
                    step="0.0001"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="chine-input border-ocean-teal/10"
                    placeholder="-122.23"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-ocean-cyan/60 px-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Navigation className="w-3 h-3" />
                  <span>Vector: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-ocean-teal transition-colors underline decoration-ocean-teal/30"
                >
                  View on Map
                </a>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="chine-button w-full"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-ocean-deep/30 border-t-ocean-deep rounded-full animate-spin" />
              ) : (
                "Calculate Prediction"
              )}
            </button>
          </form>

          <AnimatePresence>
            {(result || error) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-white/5"
              >
                {result ? (
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ocean-cyan/60">Estimated Market Value</div>
                    <div className="text-4xl font-display font-bold text-ocean-cyan tracking-tight">
                      ${result.predictedValue.toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-400/10 rounded-lg border border-red-400/20 text-[10px] text-red-300 uppercase tracking-widest text-center">
                    Connection Error
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: Visualization Placeholder & Info */}
        <div className="flex flex-col h-full gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="viz-container flex-1"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ocean-cyan/40 mb-12">
              Model Architecture & Data Flow Visualization
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                {/* Background glow */}
                <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(10,147,150,0.1)_0%,transparent_70%] pointer-events-none" />
                
                {/* Node Map */}
                <div className="relative z-10 flex items-center gap-4 md:gap-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 border-ocean-teal bg-ocean-deep flex items-center justify-center text-[10px] text-center font-bold uppercase leading-tight p-2">
                      Input Features
                    </div>
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-ocean-teal to-transparent" />
                  <div className="w-14 h-14 rounded-full border-2 border-ocean-foam bg-ocean-deep flex items-center justify-center text-[10px] text-center font-bold uppercase leading-tight p-2">
                    Dense Layer 1
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-ocean-foam to-transparent opacity-50" />
                  <div className="w-14 h-14 rounded-full border-2 border-ocean-foam bg-ocean-deep flex items-center justify-center text-[10px] text-center font-bold uppercase leading-tight p-2 opacity-50">
                    Dense Layer 2
                  </div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-ocean-foam to-ocean-teal" />
                  <div className="w-14 h-14 rounded-full border-2 border-ocean-teal bg-ocean-deep flex items-center justify-center text-[10px] text-center font-bold uppercase leading-tight p-2">
                    Price Vector
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-ocean-cyan/10">
              <div className="text-[10px] uppercase tracking-widest text-ocean-cyan/40 mb-2">Project Identity</div>
              <div className="font-display font-bold italic text-ocean-foam text-lg mb-2">CHINE: The Soul in the Machine</div>
              <p className="text-xs text-white/50 leading-relaxed max-w-md">
                Fusing organic intuition with cold algorithmic precision. Our California model leverages historical census data to forecast housing shifts across the Pacific coast.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-12 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-medium text-white/20">
        <div>&copy; 2026 CHINE Industries &bull; Pacific Sector</div>
        <div className="flex gap-8">
          <span className="hover:text-ocean-cyan transition-colors cursor-pointer">Protocol: CH-7</span>
          <span className="hover:text-ocean-cyan transition-colors cursor-pointer">Security: Verified</span>
        </div>
      </footer>
    </div>
  );
}
