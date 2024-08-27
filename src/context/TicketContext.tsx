"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of the ticket counts
type TicketCounts = {
  Adult: number;
  Senior: number;
  Child: number;
};

// Define the context type
interface TicketContextType {
  ticketCounts: TicketCounts;
  setTicketCounts: React.Dispatch<React.SetStateAction<TicketCounts>>;
}

// Create the context with an initial value of `undefined`
const TicketContext = createContext<TicketContextType | undefined>(undefined);


// Custom hook to use the TicketContext
export const useTicketContext = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};

// Define the provider's props
interface TicketProviderProps {
  children: ReactNode;
}

// Provider component
export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    Adult: 0,
    Senior: 0,
    Child: 0,
  });

  // Load the ticket counts from localStorage on mount
  useEffect(() => {
    const storedTicketCounts = sessionStorage.getItem("ticketCounts");
    if (storedTicketCounts) {
      setTicketCounts(JSON.parse(storedTicketCounts));
    }
  }, []);

  // Save the ticket counts to localStorage on change
  useEffect(() => {
    sessionStorage.setItem("ticketCounts", JSON.stringify(ticketCounts));
  }, [ticketCounts]);

  return (
    <TicketContext.Provider value={{ ticketCounts, setTicketCounts }}>
      {children}
    </TicketContext.Provider>
  );
};
