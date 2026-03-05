import React, { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';


interface ClinicalUploadProps {
    multiple?: boolean;
    folder?: string;
    label?: string;
    buttonText?: string;
    onComplete?: (urls: string[]) => void;
}

export const ImageUpload = ({
    multiple = false,
    folder = 'general',
    label = "upload image",
    onComplete,
    buttonText = "Upload"
}: ClinicalUploadProps) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 1. Handle selection and local preview with validation
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Validate file extensions
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
        const invalidFiles = files.filter(file => {
            const fileName = file.name.toLowerCase();
            return !allowedExtensions.some(ext => fileName.endsWith(ext));
        });

        if (invalidFiles.length > 0) {
            toast.error("Invalid File Type", {
                description: `Only PNG, JPG, JPEG, and WEBP files are allowed. Invalid files: ${invalidFiles.map(f => f.name).join(', ')}`
            });
            return;
        }

        const newPreviews = files.map(file => URL.createObjectURL(file));

        if (multiple) {
            setSelectedFiles(prev => [...prev, ...files]);
            setPreviews(prev => [...prev, ...newPreviews]);
        } else {
            setSelectedFiles(files);
            setPreviews(newPreviews);
        }
    };

    // 2. The Submit Trigger (The actual Backend call)
    const handleSubmit = async () => {
        if (selectedFiles.length === 0) return;

        // Check if API base URL is configured
        if (!import.meta.env.VITE_BASE_URL) {
            console.error("VITE_BASE_URL is not configured");
            toast.error("Upload Configuration Error", {
                description: "API base URL is not configured. Please check your environment variables."
            });
            return;
        }

        setIsUploading(true);
        const formData = new FormData();

        selectedFiles.forEach(file => {
            // Ensure file has proper extension for backend validation
            let fileName = file.name;
            const extension = fileName.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/)?.[0];
            
            if (!extension) {
                // Fallback: try to add extension based on MIME type
                const mimeToExt: { [key: string]: string } = {
                    'image/png': '.png',
                    'image/jpeg': '.jpg',
                    'image/jpg': '.jpg',
                    'image/webp': '.webp'
                };
                fileName = fileName + (mimeToExt[file.type] || '.jpg');
            }
            
            // Create a new File object with the corrected name
            const correctedFile = new File([file], fileName, { type: file.type });
            
            // If multiple, your NestJS interceptor usually looks for 'files'
            formData.append(multiple ? 'files' : 'file', correctedFile);
        });
        formData.append('folder', folder);

        try {
            const endpoint = multiple ? '/upload/multiple' : '/upload/single';
            console.log(`Uploading to: ${import.meta.env.VITE_BASE_URL}${endpoint}`);
            
            const response = await api.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const urls = multiple ? response.data.urls : [response.data.url];

            toast.success("Upload Successful", {
                description: `${selectedFiles.length} file(s) uploaded successfully`
            });

            if (onComplete) onComplete(urls);

            // Reset state after success
            setSelectedFiles([]);
            setPreviews([]);
        } catch (error: any) {
            console.error("UPLOAD_ERROR", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                baseURL: import.meta.env.VITE_BASE_URL
            });

            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            
            toast.error("UPLINK_CRITICAL_FAILURE", {
                description: `Upload failed: ${errorMessage}. Check console for details.`
            });
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
                <label className="text-[11px] font-black   text-orange">
                    {label}
                </label>
                {
                    multiple && <span className="text-[10px] font-mono text-gray-400">
                        {selectedFiles.length}  FILE(S) READY
                    </span>
                }
            </div>

            <div className="flex flex-wrap gap-4 min-h-[100px] p-4 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-2xl">
                {previews.map((src, idx) => (
                    <div key={idx} className="relative w-20 h-20 group">
                        <img src={src} className="w-full h-full object-cover rounded-xl border border-gray-200" alt="Preview" />
                        <button
                            onClick={() => removeFile(idx)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {(multiple || selectedFiles.length === 0) && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 flex flex-col items-center justify-center rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 transition-colors"
                    >
                        <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                )}
            </div>

            <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple={multiple}
                accept=".png,.jpeg,.jpg,.webp,image/png,image/jpeg,image/jpg,image/webp"
            />

            <button
                onClick={handleSubmit}
                disabled={selectedFiles.length === 0 || isUploading}
                className={`w-full py-4 rounded-2xl font-black text-sm   transition-all flex items-center justify-center gap-3
          ${selectedFiles.length > 0
                        ? 'bg-orange text-white hover:shadow-[0_0_20px_rgba(255,165,0,0.4)]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
                {isUploading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                ) : (
                    <>
                        <Upload className="w-4 h-4" />
                        {buttonText}
                    </>
                )}
            </button>
        </div>
    );
};