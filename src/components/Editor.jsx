import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useState } from "react";
import { RiCollapseDiagonal2Fill } from "react-icons/ri";
import { RiExpandDiagonalFill } from "react-icons/ri";

const Editor = ({ displayName, value, language, onChange, layout }) => {
  const [open, setOpen] = useState(true);
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  const handleCollapse = () => {
    console.log(open, "previous");

    setOpen((prev) => !prev);
    console.log(open, "after");
  };
  return (
    <>
      <div className={`editor-container ${open ? "" : "collapsed"}`}>
        <div className="editor-title">
          {displayName}

          {layout === "horizontal" ? (
            <button className="collapse-btn" onClick={handleCollapse}>
              {open ? <RiCollapseDiagonal2Fill /> : <RiExpandDiagonalFill />}
            </button>
          ) : (
            ""
          )}
        </div>

        <CodeMirror
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            language: { language },
            lineNumbers: true,
            theme: "material",
            smartIndent: true,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
