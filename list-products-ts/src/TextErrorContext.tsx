import React from "react";

const text: React.Dispatch<React.SetStateAction<string>> = () => {};

const TextErrorContext = React.createContext(text);

export default TextErrorContext;