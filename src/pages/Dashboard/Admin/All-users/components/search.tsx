"use client";

import { useEffect } from "react";
import { Search, ListFilter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


import { useAllUsersContext } from "../AllUsersContext";
import { Select } from "@/components/ui/select";

export default function AdvancedFilterBar() {
    const { queryParams, setQueryParams } = useAllUsersContext();


    // 2. Logging the full query object (Debounced)
    useEffect(() => {
        const handler = setTimeout(() => {
            console.log("  API REQUEST PARAMS:", queryParams);
        }, 500);
        return () => clearTimeout(handler);
    }, [queryParams]);


    // Helper to update specific keys
    const updateParam = (key: string, value: string) => {
        setQueryParams(prev => ({ ...prev, [key]: value, page: 1 }));
    };

    return (
        <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Main Search - Maps to @Query('search') */}
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="General search..."
                        className="pl-12 h-12   border-none bg-white dark:bg-zinc-900  "
                        value={queryParams.search}
                        onChange={(e) => updateParam("search", e.target.value)}
                    />
                </div>

                {/* Advanced Filters Dropdown */}
                <div className="flex items-center justify-between gap-2 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-12  gap-2 px-6">
                                <ListFilter className="w-4 h-4" />
                                Advanced Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-4 rounded-xl">
                            <DropdownMenuLabel>Detailed Filters</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <div className="space-y-3 py-2">
                                {/* @Query('username') */}
                                <div className="space-y-1">
                                    <span className="text-sm   font-bold text-gray-500">Username</span>
                                    <Input
                                        size={30}
                                        placeholder="Exact username..."
                                        value={queryParams.username}
                                        onChange={(e) => updateParam("username", e.target.value)}
                                    />
                                </div>

                                {/* @Query('role') */}
                                <div className="space-y-1">
                                    <span className="text-sm   font-bold text-gray-500">Role</span>
                                    <Select
                                        className="w-full p-2 text-sm bg-gray-50 rounded-md"
                                        value={queryParams.role}
                                        onChange={(e) => updateParam("role", e.target.value)}
                                    >
                                        <option value="">All Roles</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="DOCTOR">Doctor</option>
                                        <option value="PATIENT">Patient</option>
                                        <option value="NURSE">Nurse</option>
                                        <option value="PHARMACIST">Pharmacist</option>
                                        <option value="RECEPTIONIST">RECEPTIONIST</option>
                                        <option value="LAB_TECHNICIAN">LAB_TECHNICIAN</option>
                                    </Select>
                                </div>

                                {/* @Query('createdFrom') & @Query('createdTo') */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <span className="text-sm   font-bold text-gray-500">From</span>
                                        <Input type="date" onChange={(e) => updateParam("createdFrom", e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm   font-bold text-gray-500">To</span>
                                        <Input type="date" onChange={(e) => updateParam("createdTo", e.target.value)} />
                                    </div>
                                </div>

                                {/* @Query('includeDeleted') */}
                                <DropdownMenuCheckboxItem
                                    checked={queryParams.includeDeleted === "true"}
                                    onCheckedChange={(checked) => updateParam("includeDeleted", checked.toString())}
                                >
                                    Include Deleted Records
                                </DropdownMenuCheckboxItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Sort Order Toggle - @Query('sortOrder') */}
                    <Button
                        variant="secondary"
                        className="h-12   font-bold"
                        onClick={() => updateParam("sortOrder", queryParams.sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        {queryParams.sortOrder.toUpperCase()}
                    </Button>

                    {/* Reset Button */}
                    <Button
                        variant="denger"
                        size="icon"
                        onClick={() => setQueryParams({
                            search: "", username: "", email: "", role: "", status: "",
                            createdFrom: "", createdTo: "", includeDeleted: "false",
                            fields: "", sortBy: "createdAt", sortOrder: "desc", page: 1, limit: "10"
                        })}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>


        </div>
    );
}