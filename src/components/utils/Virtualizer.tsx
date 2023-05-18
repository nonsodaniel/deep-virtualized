import React, { useEffect, useState, useRef, ReactNode } from "react";
import { IListData } from "../../store/actions/types";
import "./virtualizer.scss";
interface IVirtualizer {
  list: IListData[];
  Component: React.ComponentType<any>;
  threshold?: number;
  gap: any;
  keyEtractorFunction: any;
}

const Virtualizer = ({
  list = [],
  Component,
  threshold = 2,
  gap = 0,
  keyEtractorFunction,
}: IVirtualizer) => {
  console.log("keyEtractorFunction", { list, keyEtractorFunction });

  const [listToRender, setListToRender] = useState({ start: 0, end: 1 });
  const [elHeigt, setElHeight] = useState(0);
  const parentContainerRef: any = useRef(null);

  useEffect(function () {
    const timeout = setTimeout(function () {
      const childElement = parentContainerRef.current?.children[0];
      const elHeight = childElement.offsetHeight + 2 * gap;
      setElHeight(elHeight);
      parentContainerRef.current?.setAttribute(
        "style",
        `height:${elHeight * list.length}px`
      );
      calcListToRender();
      clearTimeout(timeout);
    });
  }, []);

  const calcListToRender = function () {
    const containerHeight =
      parentContainerRef.current.parentElement.offsetHeight;
    const scrollTop = parentContainerRef.current.parentElement.scrollTop;
    const startIndex = Math.max(0, Math.floor(scrollTop / elHeigt) - threshold);
    const endIndex = Math.min(
      list.length - 1,
      Math.ceil((scrollTop + containerHeight) / elHeigt + threshold)
    );
    setListToRender({
      start: startIndex,
      end: endIndex,
    });
  };

  return (
    <div
      ref={parentContainerRef}
      className="virtual-container"
      onWheel={calcListToRender}
    >
      {list?.slice(listToRender.start, listToRender.end).map((item, index) => {
        console.log("key", keyEtractorFunction?.(item));
        return (
          <div
            className="virtualized-item"
            style={{
              "--gap": `${gap}px`,
              "--top": `${(listToRender.start + index) * elHeigt}px`,
              position: "relative",
            }}
            key={keyEtractorFunction?.(item)}
          >
            <Component item={item} />
            {console.log("list", { list, item })}
          </div>
        );
      })}
    </div>
  );
};

export default Virtualizer;