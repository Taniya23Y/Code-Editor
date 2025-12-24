import { toast } from "react-toastify";

export const handleError = (error) => {
  console.error(error);

  const message =
    error?.data?.message || error?.message || "Something went wrong";

  toast(`Error: ${message}`);
};
