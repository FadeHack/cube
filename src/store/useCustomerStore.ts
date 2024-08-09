// src/store/useCustomerStore.tsx

import { create } from 'zustand';
import { fetchCustomers } from '../api';

interface Customer {
    id: number;
    name: string;
    description: string;
}

interface CustomerStore {
    customers: Customer[];
    selectedCustomerId: number | null;
    selectedCustomer: Customer | null;
    photos: any[];
    currentPage: number;
    hasMore: boolean;
    loadCustomers: () => void;
    loadMoreCustomers: () => void;
    setSelectedCustomer: (id: number) => void;
    setPhotos: (photos: any[]) => void;
}

export const useCustomerStore = create<CustomerStore>((set, get) => ({
    customers: [],
    selectedCustomerId: null,
    selectedCustomer: null,
    photos: [],
    currentPage: 1,
    hasMore: true,
    loadCustomers: async () => {
        const pageSize = 20;
        const { currentPage } = get();
        const newCustomers = await fetchCustomers(currentPage, pageSize);

        // Create a map to ensure unique IDs
        const customerMap = new Map<number, Customer>();

        // Add existing customers to the map
        get().customers.forEach(customer => {
            customerMap.set(customer.id, customer);
        });

        // Add new customers to the map
        newCustomers.forEach(customer => {
            customerMap.set(customer.id, customer);
        });

        // Convert the map values to an array
        const uniqueCustomers = Array.from(customerMap.values());

        set({
            customers: uniqueCustomers,
            hasMore: newCustomers.length === pageSize,
        });
    },
    loadMoreCustomers: async () => {
        const { currentPage, hasMore } = get();
        if (!hasMore) return;

        set({ currentPage: currentPage + 1 });
        await get().loadCustomers();
    },
    setSelectedCustomer: (id) => {
        const customer = get().customers.find(c => c.id === id) || null;
        set({ selectedCustomerId: id, selectedCustomer: customer });
    },
    setPhotos: (photos) => set({ photos }),
}));
