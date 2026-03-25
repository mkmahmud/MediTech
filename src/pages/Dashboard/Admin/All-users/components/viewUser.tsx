
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAllUsersContext } from "../AllUsersContext";

interface ViewUserModalProps {
    open: boolean;
    onClose: () => void;
}


const ViewUserModal: React.FC<ViewUserModalProps> = ({ open, onClose }) => {


    const { selectedUser } = useAllUsersContext();


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 overflow-visible rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10">
                <DialogHeader className="px-8 pt-8 pb-2 border-b border-gray-100 dark:border-white/10">
                    <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <span>User Details</span>
                        {selectedUser?.role && (
                            <Badge variant="outline" className="rounded-full px-3 py-1 border-orange/20 text-orange font-bold text-[10px] uppercase tracking-wider">
                                {selectedUser.role}
                            </Badge>
                        )}
                        {selectedUser?.status && (
                            <Badge className={`rounded-xl px-4 py-1.5 font-bold text-[10px] ${selectedUser.status === 'ACTIVE' ? "bg-green-500/10 text-green-500" : "bg-orange/10 text-orange"}`}>{selectedUser.status.replace('_', ' ')}</Badge>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-gray-400 mt-1">ID: {selectedUser?.id}</DialogDescription>
                </DialogHeader>
                <div className="px-8 pb-8 pt-6">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-orange/20 shadow-sm">
                            {selectedUser?.profileImageUrl ? (
                                <img src={selectedUser.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-orange bg-orange/10">
                                    {selectedUser?.firstName?.[0] || ''}{selectedUser?.lastName?.[0] || ''}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                                {selectedUser?.firstName} {selectedUser?.lastName}
                            </div>
                            <div className="text-xs text-gray-500 font-bold mt-1">{selectedUser?.email}</div>
                            <div className="text-xs text-gray-400 mt-1">Joined: {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <div className="text-[11px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Contact</div>
                                <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/10">
                                    <p className="mb-1"><b>Phone:</b> {selectedUser?.phoneNumber || 'N/A'}</p>
                                    <p className="mb-1"><b>Email Verified:</b> {selectedUser?.emailVerified ? 'Yes' : 'No'}</p>
                                    <p className="mb-1"><b>Phone Verified:</b> {selectedUser?.phoneVerified ? 'Yes' : 'No'}</p>
                                    <p><b>2FA Enabled:</b> {selectedUser?.twoFactorEnabled ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-gray-500 uppercase mb-2 tracking-widest mt-6">Personal</div>
                                <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/10">
                                    <p className="mb-1"><b>Gender:</b> {selectedUser?.gender || 'N/A'}</p>
                                    <p className="mb-1"><b>Date of Birth:</b> {selectedUser?.dateOfBirth || 'N/A'}</p>
                                    <p className="mb-1"><b>Last Login:</b> {selectedUser?.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {selectedUser?.patient && (
                                <div>
                                    <div className="text-[11px] font-bold text-gray-500 uppercase mb-2 tracking-widest">Patient Info</div>
                                    <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-white/10">
                                        <p className="mb-1"><b>Blood Type:</b> {selectedUser.patient.bloodType || 'N/A'}</p>
                                        <p className="mb-1"><b>Height:</b> {selectedUser.patient.height || 'N/A'} cm</p>
                                        <p><b>Weight:</b> {selectedUser.patient.weight || 'N/A'} kg</p>
                                    </div>
                                </div>
                            )}
                            {/* Add doctor info if needed */}
                            {selectedUser?.notifications && selectedUser.notifications.length > 0 && (
                                <div>
                                    <div className="text-[11px] font-bold text-gray-500 uppercase mb-2 tracking-widest mt-6">Notifications</div>
                                    <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-white/10">
                                        <ul className="list-disc ml-5 space-y-1">
                                            {selectedUser.notifications.map((n) => (
                                                <li key={n.id}><b>{n.title}:</b> {n.message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewUserModal;
