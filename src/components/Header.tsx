import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  return (
    <header className="flex items-center gap-2 px-4 py-3">
      {onBack && (
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-[#1F2937] hover:text-[#2F80ED] transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
      )}
      <h1 className="text-[16px] font-semibold text-[#1F2937]">
        {title}
      </h1>
    </header>
  );
}
