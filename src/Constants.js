const prod = {
  url: {
   SOCKET_URL: 'wss://api.minerlotto.com/socket'
  },
  maintenance: true
};

const dev = {
  url: {
   SOCKET_URL: 'ws://localhost:8080/socket'
  },
  maintenance: true
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;