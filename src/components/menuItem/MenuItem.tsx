import type { FC } from "react";
import type { Feature } from "../../types/Feature";
import styles from "./MenuItem.module.css";
import clsx from "clsx";

type MenuItemProps = {
  feature: Feature;
  isSelected: boolean;
  onClick: () => void;
};
export const MenuItem: FC<MenuItemProps> = ({
  feature,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={clsx(styles.menuItem, {
        [styles.menuItem__selected]: isSelected,
      })}
      onClick={onClick}
    >
      {feature.name}
    </button>
  );
};
