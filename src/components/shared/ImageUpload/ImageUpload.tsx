import React, { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
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

    // 1. Handle selection and local preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

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

        setIsUploading(true);
        const formData = new FormData();

        selectedFiles.forEach(file => {
            // If multiple, your NestJS interceptor usually looks for 'files'
            formData.append(multiple ? 'files' : 'file', file);
        });
        formData.append('folder', folder);

        try {
            const endpoint = multiple ? '/upload/multiple' : '/upload/single';
            const response = await api.post(endpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const urls = multiple ? response.data.urls : [response.data.url];

            if (onComplete) onComplete(urls);

            // Reset state after success
            setSelectedFiles([]);
            setPreviews([]);
         } catch (error) {
            console.error("UPLOAD_ERROR", error);
            alert("UPLINK_CRITICAL_FAILURE");
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
                accept="image/*"
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