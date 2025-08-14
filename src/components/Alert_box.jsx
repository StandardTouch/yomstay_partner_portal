import React from "react";
import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Checks = Check;

function AlertBox({ onDelete, Check, hotelName }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${Check === "Cancel" && "flex items-start"} ${
          Check === "Room" && " absolute bottom-4 right-4 "
        }`}
      >
        <div
          className={`cursor-pointer ${
            Check === "Approve"
              ? "bg-green-500 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-700"
          } scale-90 hover:scale-100 transition-all duration-150 text-white rounded-2xl
                    ${
                      Check === "Hotel" &&
                      " px-2 py-1 md:py-2 md:px-2.5 rounded-md absolute bottom-2 right-2"
                    }
                    ${
                      Check === "Room" &&
                      " px-2 py-1 text-sm md:py-1 md:px-2.5 rounded-md"
                    }
                    ${
                      Check === "Cancel" &&
                      " px-2 py-1 md:py-1 md:px-3 rounded-md "
                    }
                    ${
                      Check === "Faq" &&
                      " px-2 py-1 text-sm rounded-md absolute top-2 right-2"
                    }
                    ${Check === "Reject" && " p-0.5 rounded-2xl"}
                    ${Check === "Approve" && " p-0.5 rounded-2xl"}
                    ${Check === "Amenity" && "p-0.5 rounded-2xl"}
                    ${Check === "Image" && "p-1 rounded-2xl"}`}
        >
          {Check === "Cancel" && "Cancel Chages"}
          {Check === "Room" && " Delete Room"}
          {Check === "Approve" && <Checks size={16} />}
          {(Check === "Amenity" || Check === "Image" || Check === "Reject") && (
            <X size={16} />
          )}
          {(Check === "Hotel" || Check === "Faq") && `Remove ${Check}`}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <div className="text-red-500 font-medium">{hotelName}</div>
          {Check === "Cancel" ? (
            <AlertDialogDescription>
              This Chages will not be saved
            </AlertDialogDescription>
          ) : Check === "Reject" || Check === "Approve" ? (
            <AlertDialogDescription>
              This action cannot be undone. This will permanently {Check} the
              booking.
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              {Check}.
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={`${
              Check === "Approve"
                ? "bg-green-500 hover:bg-green-700"
                : "bg-red-500 hover:bg-red-700"
            } text-white cursor-pointer`}
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertBox;
