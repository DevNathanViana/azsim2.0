// MonitorWebSocket.jsx
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let countReconnect = 0;

const connect = () => {
    const socket = new SockJS('/monitor-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, connectCallBack, errorCallback);
    socket.onclose = () => {
        console.log('Conexão encerrada');
        reconnect();
    };
};

const reconnect = () => {
    console.log("Reconectando " + countReconnect + " tentativa");
    if (stompClient !== null) {
        stompClient.disconnect();
    }

    if (countReconnect < 100) {
        sleep(10000);
        connect();
    }
    countReconnect++;
};

const listenerEvento = (evento) => {
    alert(evento)
};

const listenerOcorrencia = () => {
    // Lógica para listenerOcorrencia
};

const connectCallBack = (frame) => {
    countReconnect = 0;
    stompClient.subscribe('/topic/eventos', (evento) => {
        alert(evento.body);
    });
    stompClient.subscribe('/topic/ocorrencias', () => {
        listenerOcorrencia();
    });
};

const errorCallback = (error) => {
    console.log('Erro de comunicação: ' + error);
};

const sleep = (ms) => {
    const start = new Date().getTime();
    const expire = start + ms;
    while (new Date().getTime() < expire) { }
};

const MonitorWebSocket = () => {
    useEffect(() => {
        connect();
        // eslint-disable-next-line
    }, []);

    return <div>WebSocket em React</div>;
};

export default MonitorWebSocket;
