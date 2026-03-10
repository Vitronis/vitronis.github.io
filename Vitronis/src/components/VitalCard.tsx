import { LucideIcon } from 'lucide-react';

interface VitalCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  status?: string;
  statusType?: 'normal' | 'warning' | 'emergency';
}

export function VitalCard({ icon: Icon, title, value, status, statusType = 'normal' }: VitalCardProps) {
  const statusColors = {
    normal: 'text-[#27AE60]',
    warning: 'text-[#EB5757]',
    emergency: 'text-[#EB5757]',
  };

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <Icon size={18} strokeWidth={2} className="text-[#2F80ED]" />
      </div>
      
      <div className="space-y-0.5">
        <p className="text-[11px] font-medium text-[#6B7280]">
          {title}
        </p>
        <p className="text-[16px] font-semibold text-[#1F2937]">
          {value}
        </p>
        {status && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className={`w-1 h-1 rounded-full ${statusType === 'normal' ? 'bg-[#27AE60]' : 'bg-[#EB5757]'}`} />
            <span className={`text-[10px] ${statusColors[statusType]}`}>
              {status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}