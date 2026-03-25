import type { UserDetails } from "@/types/userDetails";
import React, { createContext, useContext, useState } from "react";

// Define the shape of your context state here

export interface AllUsersQueryParams {
    search: string;
    username: string;
    email: string;
    role: string;
    status: string;
    createdFrom: string;
    createdTo: string;
    includeDeleted: string;
    fields: string;
    sortBy: string;
    sortOrder: string;
    page: number;
    limit: string;
}

interface AllUsersContextType {
    queryParams: AllUsersQueryParams;
    setQueryParams: React.Dispatch<React.SetStateAction<AllUsersQueryParams>>;
    selectedUser: UserDetails | null;
    setSelectedUser?: React.Dispatch<React.SetStateAction<UserDetails | null>>;
    isModelOpen?: boolean;
    setIsModelOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllUsersContext = createContext<AllUsersContextType | undefined>(undefined);


const defaultQueryParams: AllUsersQueryParams = {
    search: "",
    username: "",
    email: "",
    role: "",
    status: "",
    createdFrom: "",
    createdTo: "",
    includeDeleted: "false",
    fields: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: "10"
};

export const AllUsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [queryParams, setQueryParams] = useState<AllUsersQueryParams>(defaultQueryParams);
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    return (
        <AllUsersContext.Provider value={{ queryParams, setQueryParams, selectedUser, setSelectedUser, isModelOpen, setIsModelOpen }}>
            {children}
        </AllUsersContext.Provider>
    );
};

export function useAllUsersContext() {
    const context = useContext(AllUsersContext);
    if (!context) {
        throw new Error("useAllUsersContext must be used within an AllUsersProvider");
    }
    return context;
}
