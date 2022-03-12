const prod = {
  url: {
   SOCKET_URL: 'wss://api.minerlotto.com/socket'
  },
  maintenance: true,
  maxNonce: Math.pow(2, 32) - 1
};

const dev = {
  url: {
   SOCKET_URL: 'ws://localhost:8080/socket'
  },
  maintenance: false,
  maxNonce: Math.pow(2, 32) - 1
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;