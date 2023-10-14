import styles from './view-orders.module.scss';
import React, { useEffect, useState } from 'react';

export interface ViewOrdersProps {
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

export const ViewOrders = ({ className, selectedLanguage }: ViewOrdersProps) => {
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [editRowId, setEditRowId] = useState<number | null>(null);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/admin/orders');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const rawData = await response.json();
            const transformedData = rawData.data.map((order: any[]) => ({
                id: order[0],
                order_time: order[1],
                first_name: order[2],
                last_name: order[3],
                coffee_type: order[4],
                temperature: order[5],
                toppings: order[6],
                size: order[7],
                price: parseFloat(order[8]),
                comments: order[9],
                cup: order[10],
                charles: order[11]
            }));
            setOrdersData(transformedData);
        } catch (error) {
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
            const response = await fetch('http://127.0.0.1:5000/api/admin/updateOrder', {
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

    const renderRows = () => {
        return ordersData.map((order, index) => (
            <tr key={order.id} onClick={() => handleEditClick(index)}>
                <td>{order.id}</td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.order_time}
                            onChange={(e) => handleFieldChange(e, 'order_time', index)}
                        />
                        : order.order_time}
                </td>
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
                <td>
                    {editRowId === index ?
                        <input
                            value={order.coffee_type}
                            onChange={(e) => handleFieldChange(e, 'coffee_type', index)}
                        />
                        : order.coffee_type}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.temperature}
                            onChange={(e) => handleFieldChange(e, 'temperature', index)}
                        />
                        : order.temperature}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.toppings || ''}
                            onChange={(e) => handleFieldChange(e, 'toppings', index)}
                        />
                        : order.toppings}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={order.size}
                            onChange={(e) => handleFieldChange(e, 'size', index)}
                        />
                        : order.size}
                </td>
                <td>
                    {editRowId === index ?
                        <input
                            value={String(order.price)}
                            onChange={(e) => handleFieldChange(e, 'price', index)}
                        />
                        : `¥${order.price.toFixed(2)}`}
                </td>
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
                <td>
                    {editRowId === index ?
                        <input
                            value={order.charles}
                            onChange={(e) => handleFieldChange(e, 'charles', index)}
                        />
                        : order.charles}
                </td>
            </tr>
        ));
    };

    return (
        <div className={styles['orders-table-container']}>
            <h2 className='header'>Orders Data</h2>
            <table className={styles['orders-table']}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Time</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Type</th>
                        <th>Temperature</th>
                        <th>Toppings</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Comments</th>
                        <th>Cup</th>
                        <th>CHARLES</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
        </div>
    );
};
