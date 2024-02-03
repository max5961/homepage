import React from "react";
import { useState } from "react";
import { backgrounds } from "./backgrounds";

export default function App(): React.ReactElement {
    const [background, setBackground] = useState(backgrounds[0]);
    function handleImageClick(key: number): void {
        setBackground(backgrounds[key]);
    }
    return (
        <div id="content">
            <BackgroundImage background={background} />
            <HandleBackgroundUI handleImageClick={handleImageClick} />
        </div>
    );
}

interface BackgroundImageProps {
    background: string;
}
function BackgroundImage({
    background,
}: BackgroundImageProps): React.ReactElement {
    return (
        <div
            className="background-image"
            style={{ backgroundImage: `url(${background})` }}
        ></div>
    );
}

interface HandleBackgroundUIProps {
    handleImageClick: (index: number) => void;
}
function HandleBackgroundUI({
    handleImageClick,
}: HandleBackgroundUIProps): React.ReactElement {
    const [choosing, setChoosing] = useState(false);

    function handleClick(): void {
        const newChoosing: boolean = !choosing;
        setChoosing(newChoosing);
    }

    if (!choosing) {
        return (
            <button className="change-background" onClick={handleClick}>
                Change Background
            </button>
        );
    } else {
        return (
            <ChooseBackgroundUI
                handleClick={handleClick}
                handleImageClick={handleImageClick}
            />
        );
    }
}

interface ChooseBackgroundUIProps {
    handleClick: () => void;
    handleImageClick: (index: number) => void;
}
function ChooseBackgroundUI({
    handleClick,
    handleImageClick,
}: ChooseBackgroundUIProps): React.ReactElement {
    function getBackgroundsArray(): React.ReactElement[] {
        return backgrounds.map((bg, index) => {
            return (
                <button
                    className="new-bg"
                    key={index}
                    onClick={() => handleImageClick(index)}
                >
                    <img src={bg} alt="" key={index} />
                </button>
            );
        });
    }

    return (
        <div className="choose-backgrounds-ui-container">
            <div className="backgrounds-container">{getBackgroundsArray()}</div>
            <button className="apply-changes" onClick={handleClick}>
                Apply Changes
            </button>
        </div>
    );
}
