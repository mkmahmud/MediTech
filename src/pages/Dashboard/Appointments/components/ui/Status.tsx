
import { AlertCircle, CheckCircle, Clock3, XCircle } from 'lucide-react';

export function GetStatusIcon(status: string) {
    switch (status) {
        case "scheduled":
            return <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
        case "confirmed":
            return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
        case "in_progress":
            return <Clock3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
        case "completed":
            return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
        case "cancelled":
            return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
        case "no_show":
            return <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
        case "rescheduled":
            return <AlertCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
        default:
            return null;
    }
}


export function StatusStyle(status: string) {
    switch (status) {
        case "scheduled":
            return "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
        case "confirmed":
            return "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300";
        case "in_progress":
            return "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300";
        case "completed":
            return "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300";
        case "cancelled":
            return "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300";
        default:
            return "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
}


export   function GetStatusColor(status: string) {
    switch (status) {
        case "scheduled":
            return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
        case "confirmed":
            return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
        case "in_progress":
            return "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800";
        case "completed":
            return "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800";
        case "cancelled":
            return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
        case "no_show":
            return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
        case "rescheduled":
            return "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800";
        default:
            return "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-80０";
    }
}