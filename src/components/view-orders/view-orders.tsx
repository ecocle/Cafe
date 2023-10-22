import styles from './view-orders.module.scss';
import React, {useEffect, useState} from 'react';
import {LoadingScreen} from '../loading-screen/loading-screen';

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

export const ViewOrders = ({}: ViewOrdersProps) => {
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchOrderData();
    }, []);

    const fetchOrderData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/orders');
            if (!response.ok) {
                console.error('Network response was not ok');
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
        (updatedOrders[rowIndex] as any)[field] = e.target.value;
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
                console.error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const renderRows = () => {
        return ordersData.map((order, index) => (
            <tr key={order.id} onClick={() => handleEditClick(index)}>
                <td>{order.id}</td>
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
                            value={order.price || ''}
                            onChange={(e) => handleFieldChange(e, 'price', index)}
                        />
                        : order.price}
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
            {isLoading && <LoadingScreen/>}
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
