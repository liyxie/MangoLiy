package work.liy.mango.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import work.liy.mango.controller.WebSocketOneToOneHandler;

@Configuration
@EnableWebSocket
@Lazy
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketOneToOneHandler handler;

    public WebSocketConfig(WebSocketOneToOneHandler handler) {
        this.handler = handler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(handler, "/webSocketOneToOne/{sendId}/{roomId}");
    }
}
