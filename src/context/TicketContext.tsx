"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of the ticket counts and selected seats
type TicketCounts = {
  Adult: number;
  Senior: number;
  Child: number;
};



// Define the context type, now including selectedSeats
interface TicketContextType {
  ticketCounts: TicketCounts;
  setTicketCounts: React.Dispatch<React.SetStateAction<TicketCounts>>;
  selectedSeats: ISeat[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<ISeat[]>>;
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
export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    Adult: 0,
    Senior: 0,
    Child: 0,
  });

  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);

  // Load ticketCounts and selectedSeats from sessionStorage on mount
  useEffect(() => {
    const storedTicketCounts = sessionStorage.getItem("ticketCounts");
    const storedSelectedSeats = sessionStorage.getItem("selectedSeats");

    if (storedTicketCounts) {
      setTicketCounts(JSON.parse(storedTicketCounts));
    }

    if (storedSelectedSeats) {
      setSelectedSeats(JSON.parse(storedSelectedSeats));
    }
  }, []);

  // Save ticketCounts and selectedSeats to sessionStorage when they change
  useEffect(() => {
    sessionStorage.setItem("ticketCounts", JSON.stringify(ticketCounts));
  }, [ticketCounts]);

  useEffect(() => {
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  return (
    <TicketContext.Provider
      value={{ ticketCounts, setTicketCounts, selectedSeats, setSelectedSeats }}
    >
      {children}
    </TicketContext.Provider>
  );
};
