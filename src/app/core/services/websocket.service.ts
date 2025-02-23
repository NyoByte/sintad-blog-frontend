import { Injectable } from "@angular/core";
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from "rxjs";
import SockJS from 'sockjs-client';
import { CommentModel } from "~models/comment.model";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private client: Client;
    private subscription: StompSubscription | undefined;
    private readonly WS_ENDPOINT = 'http://localhost:8080/backend-sintad-blog/ws';

    private messagesSubject$ = new BehaviorSubject<any[]>([]);
    public messages$ = this.messagesSubject$.asObservable();

    private receivedIds = new Set();

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS(this.WS_ENDPOINT),
            reconnectDelay: 5000,
            debug: (str) => console.log('STOMP: ' + str),
        });
    }

    connect(): void {
        this.client.onConnect = () => {
            console.log('Conectado al WebSocket');
            this.client.subscribe('/topic/comments', (message: IMessage) => {
                console.log(this.receivedIds);
                const comment = JSON.parse(message.body);
                if (!this.receivedIds.has(comment.id)) {
                    this.receivedIds.add(comment.id); {
                        console.log('📩 Comentario recibido:', comment);
                        this.messagesSubject$.next(comment);
                    }
                }
            });
        };

        this.client.onStompError = (frame) => {
            console.error('Error STOMP:', frame.headers['message']);
            console.error('Detalles:', frame.body);
        };

        this.client.activate();
    }

    sendComment(comment: CommentModel): void {
        this.client.publish({
            destination: '/app/comment.add', // Mismo que en @MessageMapping
            body: JSON.stringify(comment),
        });
    }

    disconnect(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.client.active) {
            this.client.deactivate();
            console.log('Desconectado del WebSocket');
        }
    }

    getMessages(): Observable<any> {
        return this.messages$;
    }

}