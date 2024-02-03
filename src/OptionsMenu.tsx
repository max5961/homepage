import React from "react";
import { useState } from "react";
import BackgroundSelector from "./BackgroundSelector";

interface OptionsMenuProps {
    backgrounds: Array<string>;
    bgIndex: number;
    setBgIndex: (num: number) => void;
}
export default function OptionsMenu({
    backgrounds,
    bgIndex,
    setBgIndex,
}: OptionsMenuProps): React.ReactElement {
    const [showBgMenu, setShowBgMenu] = useState<boolean>(true); // set to true for editing scss
    return (
        <>
            {showBgMenu ? (
                <BackgroundSelector
                    backgrounds={backgrounds}
                    bgIndex={bgIndex}
                    setBgIndex={setBgIndex}
                    setShowBgMenu={setShowBgMenu}
                />
            ) : (
                <button
                    className="change-background"
                    onClick={() => setShowBgMenu(!showBgMenu)}
                >
                    Change Background
                </button>
            )}
        </>
    );
}
