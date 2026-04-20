"use client";

import { Toast } from "radix-ui";
import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within Toaster");
  return ctx;
}

export function Toaster({ children }: { children: ReactNode }): ReactNode {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((title: string, description?: string) => {
    const id = ++nextId.current;
    setMessages((prev) => [...prev, { id, title, description }]);
    // Auto-remove after 4.5s (Toast.Provider duration handles visual close)
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 4500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider duration={4000}>
        {children}
        {messages.map((msg) => (
          <Toast.Root
            key={msg.id}
            open={true}
            className={cn(
              "fixed bottom-4 right-4 z-50 rounded-lg border border-border/20 bg-card p-4 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
              "flex flex-col gap-1 w-[380px]"
            )}
          >
            <Toast.Title className="text-sm font-semibold">{msg.title}</Toast.Title>
            {msg.description && (
              <Toast.Description className="text-xs text-muted-foreground">
                {msg.description}
              </Toast.Description>
            )}
            <Toast.Close className="absolute top-2 right-2 rounded-sm opacity-70 hover:opacity-100 text-foreground/50 hover:text-foreground">
              ×
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-2 w-[420px] max-w-screen outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
