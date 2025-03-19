package com.proyecto.portafolio.services;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class EventService {
    private List<EventCallback> callbacks = new ArrayList<>();
    private AtomicInteger nextId = new AtomicInteger(0);

    public void emit(String eventName, Object value) {
        callbacks.forEach(stored -> {
            if (stored.getEventName().equals(eventName)) {
                stored.getCallback().accept(value);
            }
        });
    }

    public int on(String eventName, Object caller, EventCallback.CallbackFunction callback) {
        int id = nextId.incrementAndGet();
        callbacks.add(new EventCallback(id, eventName, caller, callback));
        return id;
    }

    public void off(int id) {
        callbacks.removeIf(stored -> stored.getId() == id);
    }

    public void unsubscribe(Object caller) {
        callbacks.removeIf(stored -> stored.getCaller().equals(caller));
    }

    // Inner class to handle callbacks
    public static class EventCallback {
        private final int id;
        private final String eventName;
        private final Object caller;
        private final CallbackFunction callback;

        @FunctionalInterface
        public interface CallbackFunction {
            void accept(Object value);
        }

        public EventCallback(int id, String eventName, Object caller, CallbackFunction callback) {
            this.id = id;
            this.eventName = eventName;
            this.caller = caller;
            this.callback = callback;
        }

        public int getId() { return id; }
        public String getEventName() { return eventName; }
        public Object getCaller() { return caller; }
        public CallbackFunction getCallback() { return callback; }
    }
}
