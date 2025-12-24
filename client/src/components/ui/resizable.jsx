import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

export const ResizablePanelGroup = ({ className, ...props }) => {
  return (
    <ResizablePrimitive.PanelGroup
      className={`flex h-full w-full ${className || ""}`}
      {...props}
    />
  );
};

export const ResizablePanel = (props) => {
  return <ResizablePrimitive.Panel {...props} />;
};

export const ResizableHandle = ({ withHandle = false, ...props }) => {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className="relative flex w-px items-center justify-center bg-border"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center border bg-border">
          <GripVerticalIcon className="h-3 w-3" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
};
