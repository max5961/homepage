import React from "react";

interface BackgroundImageProps {
    bgIndex: number;
    backgrounds: Array<string>;
}
export default function BackgroundImage({
    bgIndex,
    backgrounds,
}: BackgroundImageProps): React.ReactElement {
    function getBackground(): string {
        return backgrounds[bgIndex];
    }
    return (
        <div
            className="background-image"
            style={{ backgroundImage: `url(${getBackground()})` }}
        ></div>
    );
}
