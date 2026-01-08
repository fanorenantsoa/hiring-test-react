import { useAppContext } from "../../contexts/AppContext";
import { MenuItem } from "../menuItem/MenuItem";
import styles from "./Menu.module.css";

export const Menu = () => {
  const { features, selectedFeature, setSelectedFeature } = useAppContext();

  return (
    <aside className={styles.menu}>
      <nav>
        {features.map((feature) => (
          <MenuItem
            key={feature.id}
            feature={feature}
            isSelected={selectedFeature?.id === feature.id}
            onClick={() => setSelectedFeature(feature)}
          />
        ))}
      </nav>
    </aside>
  );
};
