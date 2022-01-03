import { useRef } from "react";

const DargDiv = () => {
    const wrapperRef = useRef();
    const handleRef = useRef();

    function moveDiv({ movementX: moveX, movementY: moveY }) {
        let getStyle = window.getComputedStyle(wrapperRef.current);
        let left = parseInt(getStyle.left);
        let top = parseInt(getStyle.top);
        handleRef.current.style.margin = "2rem";
        wrapperRef.current.style.left = `${left + moveX}px`;
        wrapperRef.current.style.top = `${top + moveY}px`;
    }

    function moveHandler() {
        let originalMargin = handleRef.current.style.margin;
        wrapperRef.current.addEventListener("mousemove", moveDiv);
        document.addEventListener("mouseup", () => {
            handleRef.current.style.margin = originalMargin;

            wrapperRef.current.removeEventListener("mousemove", moveDiv);
        });
    }

    return (
        <div
            ref={wrapperRef}
            className='p-2 bg-slate-400 box-border absolute top-1/2 left-1/2 shadow-md -translate-x-1/2 -translate-y-1/2'
            onMouseDown={moveHandler}
        >
            <div
                ref={handleRef}
                className='border-2 active:cursor-move active:select-none'
            >
                <h1>Header</h1>
            </div>

            <div className='p-20'>
                {" "}
                <p>TEST</p>
            </div>
        </div>
    );
};

export default DargDiv;
