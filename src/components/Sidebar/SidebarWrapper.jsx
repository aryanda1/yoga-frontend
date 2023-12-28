import { useState } from "react";
import Sidebar from "./Sidebar";
import Hamburger from "../GlobalComponents/Hamburger";
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

export default function SideMenuWrapper() {
  const [showMenu, setShowMenu] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0]);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const horizontalDistance = touchStart.clientX - touchEnd.clientX;
    const isLeftSwipe = horizontalDistance > 150;
    const isRightSwipe = horizontalDistance < -150;

    const verticalDistance = touchStart.clientY - touchEnd.clientY;

    if (
      isLeftSwipe &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance)
    ) {
      setShowMenu(false);
    }
    if (
      isRightSwipe &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance)
    ) {
      setShowMenu(true);
    }
  };

  return (
    <>
      <div
        css={styles}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Hamburger
          closed={!showMenu}
          menuClickHandler={() => setShowMenu(!showMenu)}
        />
        <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        <main className="transactions">
          <Outlet />
        </main>
      </div>
    </>
  );
}

const styles = css`
  position: fixed;
  overflow: auto;
  --top: 84px;
  top: var(--top);
  height: calc(100vh - var(--top));
  height: calc(100svh - var(--top));
  width: 100vw;
  width: 100svw;
  #hamburger {
    margin-left: 2rem;
    width: 2.8rem;
    --height: 0.3rem;
    --gap: 0.35rem;
    margin-top: 2rem;
    position: absolute;
    z-index: 20;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    &.menu-active {
      position: fixed;
      .line {
        background: slategray;
        box-shadow: 0;
      }
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    h1 {
      margin: 5rem 0 1.5rem;
      font-size: clamp(1.5rem, 5vw, 3rem);
      color: #ed563b;
      text-align: center;
    }
  }
  @media (min-width: 769px) {
    #hamburger {
      &.menu-active {
        margin-left: 7rem;
      }
    }
  }
  @media (max-width: 768px) {
    #hamburger {
      margin-left: 1rem;
      margin-top: 1.25rem;
      &.menu-active {
        margin-left: 38%;
        margin-top: 3rem;
        transform: scale(1.2);
      }
    }
  }
`;
