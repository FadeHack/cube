// src/api/index.ts

import axios from "axios";


export interface Customer {
    id: number;
    name: string;
    description: string;
}

export const fetchCustomers = async (page: number, pageSize: number): Promise<Customer[]> => {
    const customers: Customer[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Customer ${i + 1}`,
        description: `This is the description for Customer ${i + 1}.`,
    }));

    // Simulate pagination
    const paginatedCustomers = customers.slice((page - 1) * pageSize, page * pageSize);

    // Simulate a small delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(paginatedCustomers), 500);
    });
};

export const fetchPhotos = async () => {
    try {
      const response = await axios.get('https://picsum.photos/v2/list', {
        params: { page: Math.floor(Math.random() * 100) + 1, limit: 9 }, // Fetch random page
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  };
