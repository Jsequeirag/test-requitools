import React from "react";

export default function Layout(props) {
  return (
    <div
      className="relative  left-[256px] w-[calc(100% - 88px)] flex pc:min-h-[86vh] movil:min-h-[86vh]"
      id="layout"
    >
      {props.children}
    </div>
  );
}
