import { useSelector } from "react-redux";

export default function RenderCode() {
  const fullCode = useSelector((state) => state.compiler.fullCode);

  const combinedCode = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      ${fullCode?.css ?? ""}
    </style>
  </head>
  <body>
    ${fullCode?.html ?? ""}
    <script>
      ${fullCode?.javascript ?? ""}
    </script>
  </body>
</html>
`;

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white border-2 border-red-500 h-full scrollbar-hide">
      <iframe
        title="code-preview"
        className="w-full h-full"
        src={iframeCode}
        sandbox="allow-scripts"
      />
    </div>
  );
}
