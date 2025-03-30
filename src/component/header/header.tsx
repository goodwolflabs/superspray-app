import { Bell, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Logo icon</title>
            <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="white" />
            <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="text-xl font-bold">Superspray</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="font-bold">0.4500</div>
            <div className="text-xs text-gray-500">Mainnet</div>
          </div>
          <div className="flex items-center gap-2 border rounded-full px-3 py-1.5">
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <span className="text-sm">0x55...50E4</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
