import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskHistogram = ({ costs, bins = 40 }) => {
    const data = useMemo(() => {
        if (!costs || !Array.isArray(costs) || costs.length === 0) return [];

        // Safe Min/Max logic (loops instead of spread to avoid stack overflow on 100k items)
        let min = Infinity;
        let max = -Infinity;
        const validCosts = [];

        for (let i = 0; i < costs.length; i++) {
            const val = Number(costs[i]);
            if (Number.isFinite(val)) {
                if (val < min) min = val;
                if (val > max) max = val;
                validCosts.push(val);
            }
        }

        if (validCosts.length === 0) return [];
        if (min === max) max = min + 1; // Prevent divide by zero

        const binSize = (max - min) / bins;

        const histogram = Array.from({ length: bins }, (_, i) => ({
            binStart: min + i * binSize,
            binEnd: min + (i + 1) * binSize,
            count: 0
        }));

        validCosts.forEach(cost => {
            const binIndex = Math.min(Math.floor((cost - min) / binSize), bins - 1);
            if (histogram[binIndex]) {
                histogram[binIndex].count += 1;
            }
        });

        return histogram.map(b => ({
            name: `₹${(b.binStart / 100000).toFixed(1)}L`,
            value: b.count,
            originalStart: b.binStart
        }));
    }, [costs, bins]);

    const p95 = useMemo(() => {
        if (!costs) return null;
        const sorted = [...costs].sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length * 0.95)];
    }, [costs]);

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        interval={Math.floor(bins / 4)}
                    />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                        itemStyle={{ color: '#38bdf8' }}
                        cursor={{ fill: 'rgba(56, 189, 248, 0.1)' }}
                        formatter={(value) => [`${value} paths`, 'Density']}
                    />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.originalStart >= p95 ? '#ef4444' : '#38bdf8'}
                                fillOpacity={entry.originalStart >= p95 ? 0.8 : 0.6}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RiskHistogram;
