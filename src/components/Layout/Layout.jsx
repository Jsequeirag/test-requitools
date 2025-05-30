import { useEffect, react } from "react";
import { getLocalStorageItem } from "../../utils/localstore";
import WebsiteConfig from "../../../stores/WebsiteConfig";
export default function Layout(props) {
  const shrinkMenu = WebsiteConfig((state) => state.shrinkMenu);

  return (
    <>
      <div
        className={`relative  min-h-screen`}
        style={{
          marginLeft: shrinkMenu === true ? "88px" : "250px",
          width: `calc(100% - ${shrinkMenu} === "true" ? "88px" : "250px"`,
        }}
      >
        <div className="w-full">{props.children}</div>
      </div>
    </>
  );
}
