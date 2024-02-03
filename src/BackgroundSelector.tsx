import React from "react";
import { useState } from "react";

interface BackgroundSelectorProps {
    backgrounds: Array<string>;
    bgIndex: number;
    setBgIndex: (num: number) => void;
    setShowBgMenu: (bool: boolean) => void;
}
export default function BackgroundSelector({
    backgrounds,
    bgIndex,
    setBgIndex,
    setShowBgMenu,
}: BackgroundSelectorProps): React.ReactElement {
    const [nextIndex, setNextIndex] = useState<number>(bgIndex);

    function handleImageClick(index: number): void {
        // re-render the background image by setting the index from which the
        // BackgroundImage prop gets the imported url from
        setBgIndex(index);
        setNextIndex(index);
    }

    function handleCancelClick(): void {
        setBgIndex(0);
        setShowBgMenu(false);
    }

    function handleApplyClick(): void {
        // chosen image always appears at front of images
        // move chosen URL to front of containing array
        const chosenUrl: string = backgrounds.splice(nextIndex, 1)[0];
        backgrounds.unshift(chosenUrl);

        setBgIndex(0);
        setShowBgMenu(false);
    }

    function getBgElements(): Array<React.ReactElement> {
        const imageElems: React.ReactElement[] = [];

        for (let i = 0; i < backgrounds.length; i++) {
            const className: string = "bg-tile";
            const chosenClassName: string = "chosen";
            const elem: React.ReactElement = (
                <button
                    className={
                        i === nextIndex
                            ? `${className} ${chosenClassName}`
                            : className
                    }
                    onClick={() => handleImageClick(i)}
                    key={i}
                >
                    <img src={backgrounds[i]} key={i} alt="" />
                </button>
            );
            imageElems.push(elem);
        }
        return imageElems;
    }

    return (
        <div className="bg-menu-container">
            <div className="bg-images-container">{getBgElements()}</div>
            <div className="buttons-container">
                <button className="apply-changes" onClick={handleApplyClick}>
                    Apply
                </button>
                <button className="cancel-changes" onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
