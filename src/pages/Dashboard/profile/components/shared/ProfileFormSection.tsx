interface ProfileFormSectionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  gradientColor: string;
  children: React.ReactNode;
  onSave?: () => void;
  isSaving?: boolean;
  showSaveButton?: boolean;
}

import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileFormSection({
  title,
  description,
  icon: Icon,
  iconColor,
  gradientColor,
  children,
  onSave,
  isSaving = false,
  showSaveButton = false
}: ProfileFormSectionProps) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0a] dark:to-[#080808] border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-40 h-40 ${gradientColor} rounded-full blur-3xl -z-10`} />
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[11px] font-black flex items-center gap-2 text-gray-600 dark:text-gray-300 uppercase tracking-widest">
            <div className={`p-2 ${iconColor} rounded-lg`}>
              <Icon className={`w-4 h-4 ${iconColor.replace('/10', '/600').replace('dark:/10', 'dark:text-orange')}`} />
            </div>
            {title}
          </h3>
          <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-wider">
            {description}
          </p>
        </div>
        {showSaveButton && (
          <Button
            type="submit"
            disabled={isSaving}
            onClick={onSave}
           >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
        {children}
      </div>
    </section>
  );
}
