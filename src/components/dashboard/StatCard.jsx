import React from 'react';
import { Card } from "@heroui/react";

/**
 * Individual Statistic Card matching Hero UI v3 documentation
 */
export function StatCard({ title, value, icon: Icon }) {
  return (
    // Hero UI v3 dropped shadow/radius props, use standard Tailwind classes here
    <Card className="bg-[#18181b] border border-[#27272a] rounded-xl shadow-sm w-full">
      {/* CardBody is now Card.Content in Hero UI v3 */}
      <Card.Content className="p-5 flex flex-col items-start gap-5">
        
        {/* Icon Container Box */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#27272a]/50 text-zinc-300 border border-zinc-800/60">
          {Icon && <Icon width={16} height={16} />}
        </div>
        
        {/* Metric Value & Label */}
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-medium text-zinc-400 tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-zinc-100 tracking-tight">
            {value}
          </p>
        </div>
        
      </Card.Content>
    </Card>
  );
}

/**
 * Main Stats Grid Wrapper to feed data dynamically
 */
// export default function DashboardStats({ statsData }) {
//   if (!statsData || statsData.length === 0) return null;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
//       {statsData.map((stat, index) => (
//         <StatCard
//           key={index}
//           title={stat.title}
//           value={stat.value}
//           icon={stat.icon}
//         />
//       ))}
//     </div>
//   );
// }