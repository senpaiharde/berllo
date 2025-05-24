import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const DropdownUi = ({ trigger, children, onClose }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    requestAnimationFrame(() => {
      const rect = triggerRef.current?.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.offsetHeight || 400;
      const dropdownWidth = dropdownRef.current?.offsetWidth || 304;
      if (rect) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX;

        const wouldOverflowBottom = rect.bottom + dropdownHeight > viewportHeight;
        if (wouldOverflowBottom) {
          top = rect.top + window.scrollY - dropdownHeight;
        }

        const wouldOverflowRight = rect.left + dropdownWidth > viewportWidth;
        if (wouldOverflowRight) {
          left = viewportWidth - dropdownWidth - 12; // add small margin from edge
        }

        setPosition({ top, left });
        console.log('Adaptive position:', top, left);
      }
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
