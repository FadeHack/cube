import axios from "axios";
import { faker } from '@faker-js/faker';

export interface Customer {
    id: number;
    name: string;
    title: string;
    address: string;
}

export const fetchCustomers = async (page: number, pageSize: number): Promise<Customer[]> => {
    const customers: Customer[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(), // Use Faker#person.fullName()
        title: faker.person.jobTitle(), // Use Faker#person.jobTitle()
        address: faker.location.streetAddress(), // Use Faker#location.streetAddress()
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
