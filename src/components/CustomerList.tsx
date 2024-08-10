// src/components/CustomerList.tsx

import React, { useEffect, useRef, useCallback } from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import { useCustomerStore } from '../store/useCustomerStore';
import CustomerCard from './CustomerCard';

const CustomerList: React.FC = () => {
    const { customers, selectedCustomerId, setSelectedCustomer, loadCustomers, loadMoreCustomers } = useCustomerStore();
    const observer = useRef<IntersectionObserver | null>(null);

    const lastCustomerElementRef = useCallback((node: HTMLLIElement | null) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreCustomers();
            }
        });

        if (node) observer.current.observe(node);
    }, [loadMoreCustomers]);

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    return (
        <List>
            {customers.map((customer, index) => (
                <ListItem
                    key={customer.id} // Ensure key is unique
                    ref={index === customers.length - 1 ? lastCustomerElementRef : null}
                    sx={{ padding: 0 }} // Remove default padding
                >
                    <ListItemButton
                        onClick={() => setSelectedCustomer(customer.id)}
                        sx={{ width: '100%' }}
                    >
                        <CustomerCard
                            name={customer.name}
                            title={customer.title}
                            isSelected={selectedCustomerId === customer.id}
                            onClick={() => setSelectedCustomer(customer.id)}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default CustomerList;
