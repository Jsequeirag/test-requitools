import { create } from "zustand";
const websiteConfig = create((set) => ({
  shrinkMenu: true,
  darkMode: {},
  setDarkMode: {},
  registerValues: {},
  setRegisterValues: (value) => {
    set(() => ({
      registerValues: value,
    }));
  },
  setShrinkMenu: (bool) => {
    set(() => ({
      shrinkMenu: bool,
    }));
  },
}));
export default websiteConfig;
