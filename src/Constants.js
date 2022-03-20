const prod = {
  url: {
   SOCKET_URL: 'wss://api.minerlotto.com/socket'
  },
  maintenance: false,
  maxNonce: Math.pow(2, 32) - 1
};

const dev = {
  url: {
   SOCKET_URL: 'ws://localhost:8080/socket'
  },
  maintenance: false,
  maxNonce: Math.pow(2, 32) - 1
};

export const CONFIG = process.env.NODE_ENV === 'development' ? dev : prod;

export const VALID_ADDRESS = new RegExp(
   '^[0-9a-zA-Z]{20,64}$'
);

export const LOG = (...logs) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(logs)
    }
}