import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const DropdownUi = ({ trigger, children, onClose }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const triggerRect = triggerRef.current?.getBoundingClientRect();
        const dropdownRect = dropdownRef.current?.getBoundingClientRect();

        if (triggerRect && dropdownRef.current) {
          const viewportWidth = window.innerWidth;

          const dropdownWidth = dropdownRect?.width || 304;

          const top = triggerRect.bottom + window.scrollY;

          let left = triggerRect.left + window.scrollX;
          if (triggerRect.left + dropdownWidth > viewportWidth) {
            left = viewportWidth - dropdownWidth - 8;
          }

          setPosition({ top, left });
        }
      });
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
        top: `${position.top}px`,
        left: `${position.left}px`,
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
