import styles from './view-orders-normal.module.scss';
import React, {useEffect, useState} from 'react';
import {LoadingScreen} from '../loading-screen/loading-screen';

export interface ViewOrdersNormalProps {
    className?: string;
    selectedLanguage: string;
}

interface Order {
    id: number;
    order_time: string;
    first_name: string;
    last_name: string;
    coffee_type: string;
    temperature: string;
    toppings: string | null;
    size: string;
    price: number;
    comments: string | null;
    cup: string | null;
    charles: string;
}

export const ViewOrdersNormal = ({className, selectedLanguage}: ViewOrdersNormalProps) => {
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        setIsLoading(true);
        try {
            const token = getCookie('access_token');
            const response = await fetch('/api/admin/ordersNormal', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const rawData = await response.json();
            const transformedData = rawData.data.map((order: any) => ({
                id: order.ID,
                order_time: order.Order_time,
                first_name: order.First_name,
                last_name: order.Last_name,
                coffee_type: order.Coffee_type,
                temperature: order.Temperature,
                toppings: order.Toppings,
                size: order.Size,
                price: parseFloat(order.Price),
                comments: order.Comments,
                cup: order.Cup,
                charles: order.Charles
            }));
            setIsLoading(false);
            setOrdersData(transformedData);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching order data:', error);
        }
    };

    const handleEditClick = (rowIndex: number) => {
        setEditRowId(rowIndex);
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Order, rowIndex: number) => {
        const updatedOrders = [...ordersData];
        (updatedOrders[rowIndex] as any)[field] = e.target.value; // Use a type assertion here
        setOrdersData(updatedOrders);
        handleSave(updatedOrders[rowIndex]);
    };

    const handleSave = async (editedOrder: Order) => {
        try {
            const response = await fetch('/api/admin/updateOrder', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedOrder),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
    }

    const renderRows = () => {
        return ordersData.map((order, index) => (
            <tr key={order.id} onClick={() => handleEditClick(index)}>
                <td>{order.order_time}</td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.first_name}
                            onChange={(e) => handleFieldChange(e, 'first_name', index)}
                        />
                        : order.first_name}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.last_name}
                            onChange={(e) => handleFieldChange(e, 'last_name', index)}
                        />
                        : order.last_name}
                </td>
                <td>{order.coffee_type}</td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.temperature}
                            onChange={(e) => handleFieldChange(e, 'temperature', index)}
                        />
                        : order.temperature}
                </td>
                <td>{order.toppings}</td>
                <td>{order.size}</td>
                <td>{order.price}</td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.comments || ''}
                            onChange={(e) => handleFieldChange(e, 'comments', index)}
                        />
                        : order.comments}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.cup || ''}
                            onChange={(e) => handleFieldChange(e, 'cup', index)}
                        />
                        : order.cup}
                </td>
            </tr>
        ));
    };

    return (
        <div className={styles['orders-table-container']}>
            {isLoading && <LoadingScreen/>}
            <h2 className='header'>{selectedLanguage === 'chinese' ? '' : 'Orders Data'}</h2>
            <table className={styles['orders-table']}>
                <thead>
                <tr>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Order Time'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'First Name'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Last Name'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Type'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Temperature'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Toppings'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Size'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Price'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Comments'}</th>
                    <th>{selectedLanguage === 'chinese' ? '' : 'Cup'}</th>
                </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        </div>
    );
};
