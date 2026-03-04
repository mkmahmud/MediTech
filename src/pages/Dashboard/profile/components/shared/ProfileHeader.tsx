import { Camera, CheckCircle2, Edit3, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/shared/ImageUpload/ImageUpload";
import { useState } from "react";
import type { ProfileUser } from "../../profileTypes";

interface ProfileHeaderProps {
    user: ProfileUser | null;
    isEditing: boolean;
    onEditToggle: () => void;
    onImageUpload: (urls: string[]) => void;
    isUploadingImage: boolean;
    isSaving?: boolean;
}

export function ProfileHeader({
    user,
    isEditing,
    onEditToggle,
    onImageUpload,
    isUploadingImage,
    isSaving = false
}: ProfileHeaderProps) {
    const [isImageUpload, setImageUpload] = useState(false);

    return (
        <header className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange/5 via-transparent to-blue/5 rounded-3xl blur-3xl -z-10" />
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 bg-white dark:bg-[#080808] border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start gap-6 flex-1">
                    {/* PROFILE IMAGE */}
                    <div className="relative group">
                        {isImageUpload ? (
                            <div className="w-72 animate-in fade-in zoom-in-95">
                                <ImageUpload
                                    label="Profile Picture"
                                    folder="avatars"
                                    onComplete={onImageUpload}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setImageUpload(false)}
                                    className="w-full mt-3 text-[9px] font-black uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                    <X className="w-3 h-3 mr-2" /> Cancel Upload
                                </Button>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-br from-orange/10 to-blue/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-orange/20 dark:border-orange/20 overflow-hidden relative group/img shadow-lg">
                                    {isUploadingImage && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                                        </div>
                                    )}
                                    <img
                                        src={user?.profileImageUrl || '/doctor.jpg'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                        <Camera
                                            className="w-7 h-7 text-white"
                                            onClick={() => !isUploadingImage && setImageUpload(true)}
                                        />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#080808] shadow-lg" />
                            </div>
                        )}
                    </div>

                    {/* USER INFO */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange to-orange/60 bg-clip-text text-transparent">
                                    {user?.firstName} {user?.lastName}
                                </h1>
                                {isEditing && (
                                    <span className="px-3 py-1 bg-orange/10 border border-orange/30 rounded-full text-[9px] font-black text-orange uppercase tracking-wider animate-pulse">
                                        Editing
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-blue/10 border border-blue/30 dark:border-blue/20 rounded-full text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                    {user?.role}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${user?.emailVerified
                                            ? 'bg-green-100 dark:bg-green-950 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
                                            : 'bg-yellow-100 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300'
                                        }`}
                                >
                                    <CheckCircle2 className="w-3 h-3" />
                                    {user?.emailVerified ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-lg w-fit">
                            ID: <span className="text-orange font-bold">{user?.id?.slice(0, 8) || "NULL_ID"}</span>
                        </p>
                    </div>
                </div>

                {/* EDIT BUTTON */}
                <Button
                    onClick={onEditToggle}
                    disabled={isSaving}

                >
                    {isEditing ? (
                        <>
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </>
                    ) : (
                        <>
                            <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                        </>
                    )}
                </Button>
            </div>
        </header>
    );
}
