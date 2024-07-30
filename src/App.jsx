import { useEffect, useState } from "react";
import Editor from "./components/Editor";

const App = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSourceDoc] = useState("");
  const [layout, setLayout] = useState("horizontal");

  useEffect(() => {
    let timer = setTimeout(() => {
      let doc = `
      <html>
      <body>${html}</body>
      <script>${js}</script>
      <style>${css}</style>
      </html>
      `;
      setSourceDoc(doc);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [html, css, js]);

  const changeLayout = () => {
    if (layout === "horizontal") {
      setLayout(() => "vertical");
    } else {
      setLayout(() => "horizontal");
    }
  };
  return (
    <>
      <header>
        <div className="logo">
          CodePen
          <p>Create your own pen</p>
        </div>
        <div>
          <button className="header-btn">Login</button>
          <button onClick={changeLayout} className="header-btn">
            Layout
          </button>
        </div>
      </header>
      <div className={layout === "vertical" ? "vertical-content" : ""}>
        <div className="pane top-pane">
          <Editor
            displayName="HTML"
            language="xml"
            value={html}
            onChange={setHtml}
            layout={layout}
          />
          <Editor
            displayName="CSS"
            language="css"
            value={css}
            onChange={setCss}
            layout={layout}
          />
          <Editor
            displayName="JS"
            language="javascript"
            value={js}
            onChange={setJs}
            layout={layout}
          />
        </div>
        <div className="pane bottom-pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default App;
