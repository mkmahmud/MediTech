import { CheckCircle2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface ProfileItemProps {
  label: string;
  value: string | number | null | undefined;
  icon: React.ComponentType<{ className?: string }>;
  verified?: boolean;
  isEditing: boolean;
  name?: string;
  type?: "text" | "email" | "number" | "date" | "select";
  options?: Array<{ label: string; value: string }>;
}

export function ProfileItem({
  label,
  value,
  icon: Icon,
  verified,
  isEditing,
  name,
  type = "text",
  options = []
}: ProfileItemProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-3 group">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-gray-100 dark:bg-white/5 rounded-lg group-hover:bg-orange/10 transition-colors">
          <Icon className="w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-orange transition-colors" />
        </div>
        <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-3 pl-6">
        {isEditing && name ? (
          type === "select" ? (
            <select
              {...register(name)}
              className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm font-bold w-full focus:ring-2 focus:ring-orange/50 focus:border-orange dark:focus:border-orange outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer hover:border-gray-300 dark:hover:border-white/20"
            >
              <option value="" disabled className="dark:bg-[#080808]">
                Select {label}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="dark:bg-[#080808]">
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...register(name)}
              type={type}
              step={type === "number" ? "any" : undefined}
              className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/10 dark:to-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm font-bold w-full focus:ring-2 focus:ring-orange/50 focus:border-orange dark:focus:border-orange outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-white/20"
            />
          )
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {value || "---"}
            </p>
            {verified && <CheckCircle2 className="w-4 h-4 text-green-500 animate-pulse" />}
          </div>
        )}
      </div>
    </div>
  );
}
