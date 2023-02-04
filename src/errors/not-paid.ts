import { ApplicationError } from "@/protocols";

export function notPaid(): ApplicationError {
  return {
    name: "notPaid",
    message: "No payment found",
  };
}
