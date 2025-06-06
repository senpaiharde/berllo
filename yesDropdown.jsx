import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const DropdownUi = ({ trigger, children, onClose }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const MOBILE_BREAKPOINT = 768; //

  const updatePosition = () => {
    requestAnimationFrame(() => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();
      if (!triggerRect || !dropdownRect) return;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      // HORIZONTAL: same as before
      let left = triggerRect.left + window.scrollX;
      if (left + dropdownRect.width > viewportW) {
        left = viewportW - dropdownRect.width - 8;
      }

      // VERTICAL: try below, else above
      const spaceBelow = viewportH - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      let top = null,
        bottom = null;

      if (spaceBelow >= dropdownRect.height) {
        // plenty of room below  open down
        top = triggerRect.bottom + window.scrollY;
      } else if (spaceAbove >= dropdownRect.height) {
        // enough room above  open up
        bottom = viewportH - triggerRect.top;
      } else {
        // not enough room either side  default to below
        top = triggerRect.bottom + window.scrollY;
      }

      setPosition({ top, left, bottom });
    });
  };

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const scrollParent = getScrollParent(triggerRef.current);

    const handleScrollOrResize = () => updatePosition();
    updatePosition();

    scrollParent.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      scrollParent.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getScrollParent(node) {
    if (!node) return null;

    while (node && node !== document.body) {
      const style = getComputedStyle(node);
      const overflowY = style.overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return node;
      }
      node = node.parentElement;
    }
    return window;
  }

  const dropdownContent = open ? (
    <div
      className="dropDownContent"
      ref={dropdownRef}
      style={{
        position: 'fixed',
        maxHeight: 'calc(100vh - 64px)',
        left: `${position.left}px`,
        ...(position.top != null
          ? { top: `${position.top}px` }
          : { bottom: `${position.bottom}px` }),
      }}>
      {typeof children === 'function' ? children({ onClose: () => setOpen(false) }) : children}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => {
            if (!prev) updatePosition(); // triggers the delayed calc
            return !prev;
          });
        }}
        style={{ display: 'inline-block' }}>
        {trigger}
      </div>

      {open && ReactDOM.createPortal(dropdownContent, document.getElementById('dropdown-root'))}
    </>
  );
};

export default DropdownUi;
