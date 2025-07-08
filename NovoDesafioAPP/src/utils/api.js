import axios from 'axios';

// API para busca de endereço por CEP
export const fetchAddressByCEP = async (cep) => {
  try {
    const cleanedCEP = cep.replace(/\D/g, '');
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar endereço');
  }
};

// Mock de produtos para demonstração
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Smartphone Galaxy S21', category: 'Eletrônicos', price: 3499.99 },
        { id: 2, name: 'Notebook Dell XPS 13', category: 'Computadores', price: 8999.99 },
        { id: 3, name: 'Fone de Ouvido Bluetooth', category: 'Acessórios', price: 299.99 },
        { id: 4, name: 'Monitor 27" 4K', category: 'Monitores', price: 1899.99 },
        { id: 5, name: 'Teclado Mecânico', category: 'Periféricos', price: 499.99 },
        { id: 6, name: 'Mouse Sem Fio', category: 'Periféricos', price: 199.99 },
        { id: 7, name: 'Tablet iPad Pro', category: 'Tablets', price: 5999.99 },
        { id: 8, name: 'Câmera DSLR', category: 'Fotografia', price: 4299.99 },
        { id: 9, name: 'Console PlayStation 5', category: 'Games', price: 4499.99 },
        { id: 10, name: 'Smart TV 55" 4K', category: 'TVs', price: 3299.99 },
        { id: 11, name: 'Impressora Multifuncional', category: 'Impressão', price: 899.99 },
        { id: 12, name: 'HD Externo 1TB', category: 'Armazenamento', price: 399.99 },
        { id: 13, name: 'Roteador Wi-Fi 6', category: 'Redes', price: 599.99 },
        { id: 14, name: 'Caixa de Som Bluetooth', category: 'Áudio', price: 799.99 },
        { id: 15, name: 'Webcam Full HD', category: 'Acessórios', price: 349.99 },
        { id: 16, name: 'Monitor Gamer 32"', category: 'Monitores', price: 2499.99 },
        { id: 17, name: 'Headset Gamer', category: 'Games', price: 699.99 },
        { id: 18, name: 'Smartwatch', category: 'Wearables', price: 1299.99 },
        { id: 19, name: 'Drone DJI Mavic', category: 'Drones', price: 5999.99 },
        { id: 20, name: 'Projetor Full HD', category: 'Projetores', price: 2899.99 },
      ]);
    }, 1000);
  });
};
