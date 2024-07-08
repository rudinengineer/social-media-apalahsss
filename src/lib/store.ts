import { create } from "zustand";

type Zustand = {
    theme: string,
    setTheme: (value: string) => void,
    imagePrevPost: Blob | null,
    setImagePrevPost: (value: Blob | null) => void,
    bottombar: boolean,
    setBottombar: (value: boolean) => void
}

export const useStore = create<Zustand>((set) => ({
    theme: 'light',
    setTheme: (value) => set({
        theme: value
    }),
    imagePrevPost: null,
    setImagePrevPost: (value) => set({
        imagePrevPost: value
    }),
    bottombar: true,
    setBottombar: (value) => set({
        bottombar: value
    })
}))