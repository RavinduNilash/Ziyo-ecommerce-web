import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderItem, Address } from './types';

export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
}

export const createOrder = async (orderData: CreateOrderData): Promise<string> => {
  if (!db) {
    throw new Error('Firestore is not initialized. Please configure your environment variables.');
  }

  try {
    const order: Omit<Order, 'id'> = {
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const getOrder = async (orderId: string): Promise<Order | null> => {
  if (!db) {
    console.warn('Firestore is not initialized. Please configure your environment variables.');
    return null;
  }

  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    
    if (orderDoc.exists()) {
      const data = orderDoc.data();
      return {
        id: orderDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  if (!db) {
    console.warn('Firestore is not initialized. Please configure your environment variables.');
    return [];
  }

  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  if (!db) {
    console.warn('Firestore is not initialized. Please configure your environment variables.');
    return [];
  }

  try {
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
};

export const updateOrderStatus = async (
  orderId: string, 
  status: Order['status']
): Promise<void> => {
  if (!db) {
    throw new Error('Firestore is not initialized. Please configure your environment variables.');
  }

  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

export const getOrderStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'processing':
      return 'text-blue-600 bg-blue-100';
    case 'shipped':
      return 'text-purple-600 bg-purple-100';
    case 'delivered':
      return 'text-green-600 bg-green-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getOrderStatusText = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

// Demo function for development when Firebase is not configured
export const createDemoOrder = async (orderData: CreateOrderData): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const orderId = `demo-order-${Date.now()}`;
  
  // Store in localStorage for demo purposes
  const existingOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
  const order: Order = {
    id: orderId,
    ...orderData,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  existingOrders.push(order);
  localStorage.setItem('demo-orders', JSON.stringify(existingOrders));
  
  return orderId;
};

export const getDemoUserOrders = (userId: string): Order[] => {
  const orders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
  return orders
    .filter((order: Order) => order.userId === userId)
    .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
